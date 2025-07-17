import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Bell,
  AlertTriangle,
  Heart,
  Thermometer,
  Activity,
  Phone,
  Eye,
  Search,
  X,
} from "lucide-react";

const SubHeader = ({ stype }) => (
  <div className="p-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{stype}</h2>
      <p className="text-base text-gray-600 mt-1">
        We're thrilled to have you here!
      </p>
    </div>
  </div>
);

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const notificationsRef = useRef([]);

  const getIconForNotification = (reason) => {
    if (typeof reason !== "string") {
      return AlertTriangle; // Return a default icon if reason is not a string
    }
    if (reason.includes("Cardiac")) return Heart;
    if (reason.includes("Temperature")) return Thermometer;
    return AlertTriangle; // Default icon for other critical alerts
  };

  useEffect(() => {
    const fetchNotifications = () => {
      const notificationString = localStorage.getItem("notifications");
      if (notificationString === notificationsRef.current) {
        // No change, do nothing
        return;
      }

      notificationsRef.current = notificationString;
      const notificationArray = JSON.parse(notificationString) || [];
      console.log("Notifications updated:", notificationArray);

      const processedNotifications = notificationArray.map((notification) => ({
        ...notification,
        id: notification.id || Date.now() + Math.random(),
        icon: getIconForNotification(notification.reason),
        riskLevel: notification.riskLevel || "Critical",
        level: notification.level || "critical",
        phone: notification.contactNumber,
      }));

      setNotifications(processedNotifications);
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = notifications.filter(
        (notification) =>
          (notification.name &&
            notification.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (notification.patientId &&
            notification.patientId
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (notification.reason &&
            notification.reason
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredNotifications(filtered);
    } else {
      setFilteredNotifications(notifications);
    }
  }, [searchTerm, notifications]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = notifications.filter(
      (notification) =>
        notification.name.toLowerCase().includes(term) ||
        notification.patientId.toLowerCase().includes(term) ||
        notification.reason.toLowerCase().includes(term)
    );
    setFilteredNotifications(filtered);
  };

  const getRiskLevelColor = (level) => {
    return "text-red-600";
  };

  const dismissNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  return (
    <div>
      <SubHeader stype="Notification" />
      <div className="w-full h-auto relative">
        <div className="w-full flex justify-end">
          <div className="w-2/5 h-[40px] relative rounded-full flex shadow-[0_0_5px_rgba(0,0,0,0.20)] mb-8">
            <input
              className="h-full w-full bg-white rounded-full placeholder:text-xs pl-3 pr-15 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Search by name, patient ID, or alert reason..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="h-full aspect-square bg-[#1330BE] text-white border-none px-5 py-2 text-xs font-bold rounded-full absolute right-0 flex justify-center items-center">
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
                  {searchTerm
                    ? "No notifications match your search"
                    : "Processing sensor data... Notifications will appear here"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-red-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.name}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {notification.patientId}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 mb-2">
                            <IconComponent
                              className={`w-4 h-4 ${getRiskLevelColor(
                                notification.level
                              )}`}
                            />
                            <p className="text-sm text-gray-700">
                              {notification.reason}
                            </p>
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
                        <button className="text-indigo-600 hover:text-indigo-400 p-1">
                          <Eye size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-400 p-1">
                          <Bell size={16} />
                        </button>
                        <button
                          onClick={() => dismissNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600 p-1"
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
