#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <OneWire.h>
#include <DallasTemperature.h>

// MAX30102
MAX30105 particleSensor;
const int SAMPLE_DELAY_MS = 20;
const int IR_THRESHOLD = 50000;
const int FILTER_WINDOW_SIZE = 5;
const int BEAT_HISTORY_SIZE = 5;
const int BUFFER_SIZE = 100;
const int COLLECTION_TIME = 12000;

float bpmReadings[120];
float spo2Readings[120];
long irBuffer[BUFFER_SIZE];
long redBuffer[BUFFER_SIZE];
int bufferIndex = 0;
unsigned long beatTimes[BEAT_HISTORY_SIZE] = {0};
int beatIndex = 0;
float lastBPM = 0;
bool collecting = false;
unsigned long startTime = 0;
int readingCount = 0;

// DS18B20
#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);
float temperatureSum = 0;
int tempCount = 0;

// Moving average filter
float movingAverageFilter(float newValue) {
  static float window[FILTER_WINDOW_SIZE] = {0};
  static int index = 0;
  static float sum = 0;

  sum -= window[index];
  window[index] = newValue;
  sum += window[index];
  index = (index + 1) % FILTER_WINDOW_SIZE;

  return sum / FILTER_WINDOW_SIZE;
}

// BPM validation
float validateBPM(float newBPM) {
  if (lastBPM == 0) return newBPM;
  if (abs(newBPM - lastBPM) > 20) return lastBPM;
  return newBPM;
}

// Signal quality check
bool isSignalGood(long irValue) {
  static long lastIR = 0;
  long diff = abs(irValue - lastIR);
  lastIR = irValue;
  return (irValue > IR_THRESHOLD && diff < 5000);
}

// Store IR/Red sample
void storeSample(long ir, long red) {
  irBuffer[bufferIndex] = ir;
  redBuffer[bufferIndex] = red;
  bufferIndex = (bufferIndex + 1) % BUFFER_SIZE;
}

// SpO2 using AC/DC ratio
float computeSpO2_AC_DC() {
  long irMin = irBuffer[0], irMax = irBuffer[0], irSum = 0;
  long redMin = redBuffer[0], redMax = redBuffer[0], redSum = 0;

  for (int i = 0; i < BUFFER_SIZE; i++) {
    irMin = min(irMin, irBuffer[i]);
    irMax = max(irMax, irBuffer[i]);
    redMin = min(redMin, redBuffer[i]);
    redMax = max(redMax, redBuffer[i]);
    irSum += irBuffer[i];
    redSum += redBuffer[i];
  }

  float irAC = irMax - irMin;
  float redAC = redMax - redMin;
  float irDC = irSum / BUFFER_SIZE;
  float redDC = redSum / BUFFER_SIZE;

  if (irAC == 0 || irDC == 0 || redAC == 0 || redDC == 0) return 0;

  float R = (redAC / redDC) / (irAC / irDC);
  float spo2 = -45.060 * R * R + 30.354 * R + 94.845;
  return constrain(spo2, 70.0, 100.0);
}

// Median BPM
float computeMedianBPM(float *readings, int count) {
  for (int i = 0; i < count - 1; i++) {
    for (int j = i + 1; j < count; j++) {
      if (readings[i] > readings[j]) {
        float temp = readings[i];
        readings[i] = readings[j];
        readings[j] = temp;
      }
    }
  }
  return readings[count / 2];
}

void setup() {
  Serial.begin(115200);
  Wire.begin();

  // Initialize MAX30102
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 not found!");
    while (1);
  }
  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x1F);
  particleSensor.setPulseAmplitudeIR(0x1F);
  particleSensor.setPulseAmplitudeGreen(0);
  Serial.println("Place your finger on the sensor.");

  // Initialize DS18B20
  tempSensor.begin();
}

void loop() {
  long irValue = particleSensor.getIR();
  long redValue = particleSensor.getRed();
  storeSample(irValue, redValue);

  // Read temperature every loop (1s if SAMPLE_DELAY_MS is 20ms)
  static unsigned long lastTempRead = 0;
  if (millis() - lastTempRead >= 1000) {
    tempSensor.requestTemperatures();
    float tempC = tempSensor.getTempCByIndex(0);
    if (tempC != DEVICE_DISCONNECTED_C) {
      temperatureSum += tempC;
      tempCount++;
    }
    lastTempRead = millis();
  }

  if (isSignalGood(irValue)) {
    if (!collecting) {
      collecting = true;
      readingCount = 0;
      temperatureSum = 0;
      tempCount = 0;
      startTime = millis();
      Serial.println("✅ Finger detected. Measuring...");
    }

    float filteredIR = movingAverageFilter(irValue);

    if (checkForBeat(filteredIR)) {
      unsigned long currentTime = millis();
      beatTimes[beatIndex] = currentTime;
      beatIndex = (beatIndex + 1) % BEAT_HISTORY_SIZE;

      if (beatTimes[BEAT_HISTORY_SIZE - 1] != 0) {
        float avgInterval = (beatTimes[(beatIndex + BEAT_HISTORY_SIZE - 1) % BEAT_HISTORY_SIZE] -
                             beatTimes[beatIndex]) / (BEAT_HISTORY_SIZE - 1);
        float bpm = 60000.0 / avgInterval;
        bpm = validateBPM(bpm);
        lastBPM = bpm;

        float spo2 = computeSpO2_AC_DC();

        if (readingCount < 120) {
          bpmReadings[readingCount] = bpm;
          spo2Readings[readingCount] = spo2;
          readingCount++;

          Serial.print("BPM: "); Serial.print(bpm);
          Serial.print("  SpO2: "); Serial.print(spo2, 1);
          Serial.print("%  Temp: "); Serial.print(temperatureSum / max(tempCount, 1), 1);
          Serial.print(" °C  Reading "); Serial.println(readingCount);
        }
      }
    }

    if ((millis() - startTime) >= COLLECTION_TIME) {
      float medianBPM = computeMedianBPM(bpmReadings, readingCount);
      float sumSpO2 = 0;
      for (int i = 0; i < readingCount; i++) sumSpO2 += spo2Readings[i];
      float avgSpO2 = (readingCount > 0) ? sumSpO2 / readingCount : 0;
      float avgTemp = (tempCount > 0) ? temperatureSum / tempCount : 0;

      Serial.println("\n✅ Measurement complete:");
      Serial.print("Median BPM: "); Serial.println(medianBPM);
      Serial.print("Avg SpO2: "); Serial.print(avgSpO2, 1); Serial.println("%");
      Serial.print("Avg Temp: "); Serial.print(avgTemp, 1); Serial.println(" °C");
      Serial.println("-----------------------");

      collecting = false;
      delay(2000);
    }

  } else {
    if (collecting) {
      Serial.println("❌ Finger removed or poor signal. Resetting...");
      collecting = false;
    }
  }

  delay(SAMPLE_DELAY_MS);
}
