import React, { useState, useEffect } from 'react';
import { User, Bell, AlertTriangle, Heart, Thermometer, Activity, Phone, Eye, Search, X } from 'lucide-react';

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
      
      // Create a very attention-grabbing sound with rapid beeps
      const createBeep = (freq, startTime, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, startTime);
        gainNode.gain.setValueAtTime(0.5, startTime);
        
        oscillator.start(startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        oscillator.stop(startTime + duration);
      };
      
      // Create urgent pattern: rapid high-pitched beeps
      const now = audioContext.currentTime;
      createBeep(1000, now, 0.15);         // High urgent beep
      createBeep(1000, now + 0.2, 0.15);   // High urgent beep
      createBeep(1000, now + 0.4, 0.15);   // High urgent beep
      createBeep(800, now + 0.7, 0.3);     // Lower sustained tone
      createBeep(1000, now + 1.1, 0.15);   // Final high beep
      createBeep(1000, now + 1.3, 0.15);   // Final high beep
      
    } catch (error) {
      console.log('Audio not supported or blocked by browser');
    }
  };

  // Simulate real-time sensor data processing through ML
  useEffect(() => {
    const generateNotification = () => {
      const patients = ['Anushka Perera', 'Dinuka Fernando', 'Kasuni Silva', 'Ruwan Jayasuriya', 'Shehani Karunaratne', 'Sahan Madushanka', 'Chamodi Wickramasinghe', 'Nisal Weerakkody', 'Bimsara Dissanayake', 'Isuri Rathnayake'];
      const criticalAlerts = [
        { 
          reason: 'Blood Sugar Level Critical', 
          icon: AlertTriangle
        },
        { 
          reason: 'Severe Cardiac Arrhythmia Detected', 
          icon: Heart
        },
        { 
          reason: 'Blood Pressure Dangerously High', 
          icon: AlertTriangle
        },
        { 
          reason: 'Oxygen Saturation Critically Low', 
          icon: AlertTriangle
        },
        { 
          reason: 'Emergency: Patient Unresponsive', 
          icon: AlertTriangle
        },
        { 
          reason: 'Critical Temperature Alert', 
          icon: Thermometer
        }
      ];

      const randomPatient = patients[Math.floor(Math.random() * patients.length)];
      const randomAlert = criticalAlerts[Math.floor(Math.random() * criticalAlerts.length)];
      const patientId = `#${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`;
      const phoneNumber = '+94 711867163';

      return {
        id: Date.now() + Math.random(),
        name: randomPatient,
        patientId,
        reason: randomAlert.reason,
        riskLevel: 'Critical',
        level: 'critical',
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
      
      // Play sound for all critical notifications
      playNotificationSound();
      
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
    return 'text-red-600';
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setFilteredNotifications(prev => prev.filter(notification => notification.id !== id));
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
          <div className="overflow-y-auto w-full h-full space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm ? 'No notifications match your search' : 'Processing sensor data... Notifications will appear here'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div key={notification.id} 
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-red-500 bg-red-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">{notification.name}</h3>
                            <span className="text-xs text-gray-500">{notification.patientId}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <IconComponent className={`w-4 h-4 ${getRiskLevelColor(notification.level)}`} />
                            <p className="text-sm text-gray-700">{notification.reason}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {notification.riskLevel}
                            </span>
                            
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Phone className="w-3 h-3" />
                              <span>{notification.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className='text-indigo-600 hover:text-indigo-400 p-1'>
                          <Eye size={16} />
                        </button>
                        <button className='text-red-600 hover:text-red-400 p-1'>
                          <Bell size={16} />
                        </button>
                        <button 
                          onClick={() => dismissNotification(notification.id)}
                          className='text-gray-400 hover:text-gray-600 p-1'
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;