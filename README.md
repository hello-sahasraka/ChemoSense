# 🚀 ChemoSense

**ChemoSense** is a health monitoring system designed to track **post-chemotherapy complications** in patients using vital signs data. The system leverages **React Native for mobile**, **React for web frontend**, and **FastAPI for the backend**, offering a seamless cross-platform experience.  

The solution focuses on:

- **🩺 Patient Risk Monitoring**  
  Monitors vital signs (body temperature, heart rate, SpO₂) to classify patients into **High, Medium, or Low risk** categories.  

- **📊 Data Visualization**  
  Displays trends, alerts, and risk levels in intuitive dashboards for doctors and caregivers.  

- **📱 Multi-platform Access**  
  Supports both mobile (React Native) and web (React) interfaces for real-time monitoring.  

- **🔔 Alerts & Notifications**  
  Sends warnings to medical staff if patient vitals indicate potential complications.  

By integrating machine learning predictions with real-time monitoring, ChemoSense enhances **patient safety, early detection of complications, and healthcare efficiency**.  

---

## 🧰 Tech Stack

- **Backend:** FastAPI (Python)  
- **Web Frontend:** React.js  
- **Mobile Frontend:** React Native  
- **Database:** Firebase Firestore  
- **Machine Learning:** Python (Scikit-Learn)  

---

## 📦 Prerequisites

- Node.js v18+  
- npm / yarn  
- Python 3.9+  
- Expo CLI (for React Native)  
- Git  

---

## ⚙️ Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/hello-sahasraka/ChemoSense.git
cd ChemoSense
````

---

### 2. Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload
```

Backend API will be available at `http://localhost:8000`.

---

### 3. Web Frontend Setup (React)

```bash
cd ../web

# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
```

Web app will open at `http://localhost:3000`.

---

### 4. Mobile Frontend Setup (React Native)

```bash
cd ../mobile

# Install dependencies
npm install
# or
yarn install

# Start Expo development server
npx expo start
```

Scan the QR code with **Expo Go** on your mobile device or run in an emulator.

---

## 🧾 Running the System

* Ensure **backend FastAPI server** is running at `http://localhost:8000`.
* Launch **web frontend** to access dashboards.
* Launch **mobile app** for patient monitoring.
* Firebase Firestore handles real-time data updates and storage.

---

## ✅ Tips

* Keep all three components (backend, web, mobile) running simultaneously for full functionality.
* Use **Python virtual environments** for backend isolation.
* For mobile testing, Expo Go is recommended.

---

## 🧼 Troubleshooting

* **Backend not running:** Ensure virtual environment is activated and dependencies installed.
* **Frontend not loading:** Check Node.js version and that `npm install` completed without errors.
* **Firebase issues:** Verify correct Firestore rules and API keys in frontend and backend.
