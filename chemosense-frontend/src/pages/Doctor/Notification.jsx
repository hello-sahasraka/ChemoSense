import React, { useState, useEffect } from 'react';
import { User, Bell, AlertTriangle, Heart, Thermometer, Activity, Phone, Eye, Search } from 'lucide-react';

const SubHeader = ({ stype }) => (
  <div className="p-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{stype}</h2>
      <p className="text-base text-gray-600 mt-1">We're thrilled to have you here!</p>
    </div>
  </div>
);

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  // Create notification sound using Web Audio API
  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a longer notification beep
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      console.log('Audio not supported or blocked by browser');
    }
  };

  // Simulate real-time sensor data processing through ML
  useEffect(() => {
    const generateNotification = () => {
      const patients = ['Anushka Perera', 'Dinuka Fernando', 'Kasuni Silva', 'Ruwan Jayasuriya', 'Shehani Karunaratne', 'Sahan Madushanka', 'Chamodi Wickramasinghe', 'Nisal Weerakkody', 'Bimsara Dissanayake', 'Isuri Rathnayake'];
      const alertTypes = [
        { 
          reason: 'High Blood Pressure Detected', 
          level: 'warning', 
          icon: Heart,
          riskLevel: 'Medium'
        },
        { 
          reason: 'Heart Rate Irregularity Detected', 
          level: 'warning', 
          icon: Heart,
          riskLevel: 'Medium'
        },
        { 
          reason: 'Blood Sugar Level Critical', 
          level: 'critical', 
          icon: AlertTriangle,
          riskLevel: 'Critical'
        },
        { 
          reason: 'Severe Cardiac Arrhythmia Detected', 
          level: 'critical', 
          icon: Heart,
          riskLevel: 'Critical'
        },
        { 
          reason: 'Blood Pressure Dangerously High', 
          level: 'critical', 
          icon: AlertTriangle,
          riskLevel: 'Critical'
        },
        { 
          reason: 'Irregular Heartbeat Pattern', 
          level: 'warning', 
          icon: Activity,
          riskLevel: 'Medium'
        }
      ];

      const randomPatient = patients[Math.floor(Math.random() * patients.length)];
      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const patientId = `#${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`;
      const phoneNumber = '+94 711867163';

      return {
        id: Date.now() + Math.random(),
        name: randomPatient,
        patientId,
        reason: randomAlert.reason,
        riskLevel: randomAlert.riskLevel,
        level: randomAlert.level,
        icon: randomAlert.icon,
        phone: phoneNumber,
        timestamp: new Date()
      };
    };

    // Initial notifications
    const initialNotifications = Array.from({ length: 8 }, generateNotification);
    setNotifications(initialNotifications);
    setFilteredNotifications(initialNotifications);

    // Simulate real-time ML processing and notifications
    const interval = setInterval(() => {
      const newNotification = generateNotification();
      
      // Play sound for critical notifications
      if (newNotification.riskLevel === 'Critical') {
        playNotificationSound();
      }
      
      setNotifications(prev => {
        const updated = [newNotification, ...prev];
        const limited = updated.slice(0, 10); // Keep maximum 10 notifications
        
        // Apply current search filter to updated notifications
        if (searchTerm) {
          const filtered = limited.filter(notification => 
            notification.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            notification.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.reason.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredNotifications(filtered);
        } else {
          setFilteredNotifications(limited);
        }
        
        return limited;
      });
    }, 8000); // New notification every 8 seconds

    return () => clearInterval(interval);
  }, [searchTerm]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = notifications.filter(notification => 
      notification.name.toLowerCase().includes(term) || 
      notification.patientId.toLowerCase().includes(term) ||
      notification.reason.toLowerCase().includes(term)
    );
    setFilteredNotifications(filtered);
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'critical':
      case 'Critical':
        return 'text-red-600';
      case 'warning':
      case 'Medium':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };



  return (
    <div>
      <SubHeader stype="Notification" />
      <div className='w-full h-auto relative'>
        <div className="w-full flex justify-end">
          <div className="w-2/5 h-[40px] relative rounded-full flex shadow-[0_0_5px_rgba(0,0,0,0.20)] mb-8">
            <input 
              className='h-full w-full bg-white rounded-full placeholder:text-xs pl-3 pr-15 focus:outline-none focus:ring-2 focus:ring-blue-400' 
              type="text" 
              placeholder="Search by name, patient ID, or alert reason..."
              value={searchTerm}
              onChange={handleSearch} 
            />
            <div className='h-full aspect-square bg-[#1330BE] text-white border-none px-5 py-2 text-xs font-bold rounded-full absolute right-0 flex justify-center items-center'>
              <Search size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-[450px] absolute top-[67px]">
          <div className="overflow-y-auto w-full h-full">
            <table className="min-w-full divide-y divide-gray-900">
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Patient ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Reason Behind Alert</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Contact No</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-400">
                {filteredNotifications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm ? 'No notifications match your search' : 'Processing sensor data... Notifications will appear here'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredNotifications.map((notification, index) => {
                    const IconComponent = notification.icon;
                    return (
                      <tr key={notification.id}
                        className="opacity-100 transition-opacity duration-300"
                      >
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-500 flex gap-2 items-center'>
                          <User className="w-6 h-6 text-gray-400" />
                          {notification.name}
                        </td>
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500'>
                          {notification.patientId}
                        </td>
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500'>
                          <div className="flex items-center space-x-2">
                            <IconComponent className={`w-4 h-4 ${getRiskLevelColor(notification.level)}`} />
                            <span>{notification.reason}</span>
                          </div>
                        </td>
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium'>
                          <span className={`font-semibold ${getRiskLevelColor(notification.riskLevel)}`}>
                            {notification.riskLevel}
                          </span>
                        </td>
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500'>
                          {notification.phone}
                        </td>
                        <td className='px-6 py-3 whitespace-nowrap'>
                          <button className='text-indigo-600 hover:text-indigo-400 mr-2 cursor-pointer'>
                            <Eye size={18} />
                          </button>
                          <button className='text-red-600 hover:text-red-400 cursor-pointer'>
                            <Bell size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;