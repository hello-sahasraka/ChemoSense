import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Appointment = {
  time: string;
  doctor: string;
  type: string;
  tests: string[];
};

const PatientAppointmentCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Record<string, Appointment>>({});

  useEffect(() => {
    setAppointments({
      '2025-06-02': {
        time: '10:00 AM',
        doctor: 'Dr. Smith',
        type: 'Checkup',
        tests: ['Blood Test', 'X-Ray', 'Blood Pressure Check'],
      },
      '2025-06-04': {
        time: '2:00 PM',
        doctor: 'Dr. Lee',
        type: 'Consultation',
        tests: ['CT Scan'],
      },
    });
  }, []);

  const formatDate = (date: Date, formatStr: string): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (formatStr === 'MMMM yyyy') {
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    } else if (formatStr === 'yyyy-MM-dd') {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    } else if (formatStr === 'MMM d, yyyy') {
      return `${shortMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } else if (formatStr === 'EEEE, MMM d, yyyy') {
      return `${days[date.getDay()]}, ${shortMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    return date.toString();
  };

  const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startOfWeek = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };
  const endOfWeek = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + 6;
    return new Date(d.setDate(diff));
  };
  const addDays = (date: Date, days: number): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  const addMonths = (date: Date, months: number): Date => new Date(date.getFullYear(), date.getMonth() + months, 1);
  const subMonths = (date: Date, months: number): Date => new Date(date.getFullYear(), date.getMonth() - months, 1);
  const isSameMonth = (d1: Date, d2: Date) => d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  const isSameDay = (d1: Date, d2: Date) => d1.getDate() === d2.getDate() && isSameMonth(d1, d2) && d1.getFullYear() === d2.getFullYear();

  const handleDateClick = (day: Date) => {
    const dateKey = formatDate(day, 'yyyy-MM-dd');
    if (appointments[dateKey]) {
      setSelectedDate(day);
      setIsModalOpen(true);
    }
  };

  const renderHeader = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 15 }}>
      <TouchableOpacity onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        <Feather name="chevron-left" size={24} color="#2B59FF" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: '600', color: '#333' }}>
        {formatDate(currentMonth, 'MMMM yyyy')}
      </Text>
      <TouchableOpacity onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        <Feather name="chevron-right" size={24} color="#2B59FF" />
      </TouchableOpacity>
    </View>
  );

  const renderDays = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        {dayNames.map((day, i) => (
          <Text key={i} style={{ flex: 1, textAlign: 'center', fontWeight: '600', color: '#666' }}>{day}</Text>
        ))}
      </View>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let day = startDate;
    const rows = [];

    while (day <= endDate) {
      const days = [];

      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const formattedDate = cloneDay.getDate();
        const dateKey = formatDate(cloneDay, 'yyyy-MM-dd');
        const isToday = isSameDay(cloneDay, new Date());
        const hasAppointment = !!appointments[dateKey];

        days.push(
          <TouchableOpacity
            key={cloneDay.getTime()}
            style={{
              width: 40,
              height: 40,
              margin: 4,
              backgroundColor: !isSameMonth(cloneDay, monthStart)
                ? '#f0f0f0'
                : hasAppointment
                  ? isToday
                    ? '#1E40AF'
                    : '#DBEAFE'
                  : isToday
                    ? '#1E40AF'
                    : '#fff',
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: hasAppointment ? 1 : 0,
              borderColor: hasAppointment ? '#3B82F6' : 'transparent',
            }}
            onPress={() => handleDateClick(cloneDay)}
            activeOpacity={0.7}
          >
            <Text
              style={{
                color: !isSameMonth(cloneDay, monthStart) ? '#999' : isToday ? '#fff' : '#333',
                fontWeight: isToday ? '700' : '400',
                fontSize: 14,
              }}
            >
              {formattedDate}
            </Text>
            {hasAppointment && (
              <Text
                style={{
                  fontSize: 8,
                  color: '#1E40AF',
                  fontWeight: '600',
                  marginTop: 2,
                  lineHeight: 10,
                }}
                numberOfLines={1}
              >
                Appt
              </Text>
            )}
          </TouchableOpacity>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <View
          key={day.getTime()}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 4,
          }}
        >
          {days}
        </View>
      );
    }

    return <View>{rows}</View>;
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    const upcoming: Array<{ date: Date; dateStr: string } & Appointment> = [];

    Object.entries(appointments).forEach(([dateStr, appointment]) => {
      const appointmentDate = new Date(dateStr);
      if (appointmentDate >= today) {
        upcoming.push({ date: appointmentDate, dateStr, ...appointment });
      }
    });

    upcoming.sort((a, b) => a.date.getTime() - b.date.getTime());

    return upcoming.slice(0, 3);
  };

  const renderModal = () => {
    if (!selectedDate) return null;
    const dateKey = formatDate(selectedDate, 'yyyy-MM-dd');
    const appointment = appointments[dateKey];

    if (!appointment) return null;

    return (
      <Modal visible={isModalOpen} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, maxHeight: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Appointment Details</Text>
            <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: '600' }}>Date:</Text> {formatDate(selectedDate, 'EEEE, MMM d, yyyy')}</Text>
            <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: '600' }}>Time:</Text> {appointment.time}</Text>
            <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: '600' }}>Doctor:</Text> {appointment.doctor}</Text>
            <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: '600' }}>Type:</Text> {appointment.type}</Text>
            <Text style={{ fontWeight: '600', marginBottom: 5 }}>Tests:</Text>
            <ScrollView style={{ maxHeight: 100, marginBottom: 20 }}>
              {appointment.tests.map((test, idx) => (
                <Text key={idx} style={{ marginLeft: 10, marginBottom: 3 }}>- {test}</Text>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setIsModalOpen(false)}
              style={{ alignSelf: 'flex-end', backgroundColor: '#2B59FF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6 }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Upcoming Appointments */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Upcoming Appointments</Text>
        {getUpcomingAppointments().length === 0 ? (
          <Text>No upcoming appointments</Text>
        ) : (
          getUpcomingAppointments().map(({ dateStr, time, doctor, type, tests }) => (
            <View key={dateStr} style={{ padding: 10, marginBottom: 8, backgroundColor: '#E0E7FF', borderRadius: 6 }}>
              <Text style={{ fontWeight: '600' }}>{formatDate(new Date(dateStr), 'MMM d, yyyy')} - {time}</Text>
              <Text>Doctor: {doctor}</Text>
              <Text>Type: {type}</Text>
              <Text>Tests: {tests.join(', ')}</Text>
            </View>
          ))
        )}
      </View>

      {renderModal()}
    </View>
  );
};

export default PatientAppointmentCalendar;
