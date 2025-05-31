import { useState } from "react";

const formatDate = (date, formatStr) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (formatStr === "MMMM yyyy") {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  } else if (formatStr === "MMM d, yyyy") {
    return `${shortMonths[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
  } else if (formatStr === "PPP") {
    return `${days[date.getDay()]}, ${shortMonths[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
  } else if (formatStr === "EEE") {
    return shortDays[date.getDay()];
  } else if (formatStr === "d") {
    return date.getDate().toString();
  } else if (formatStr === "yyyy-MM-dd") {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }
  return date.toString();
};

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);
const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};
const endOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
};
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};
const subMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
};
const isSameMonth = (date1, date2) => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    const startHour = i === 0 ? 12 : i > 12 ? i - 12 : i;
    const endHour = i + 1 === 0 ? 12 : i + 1 > 12 ? i + 1 - 12 : i + 1;

    const startPeriod = i < 12 ? "AM" : "PM";
    const endPeriod = i + 1 === 24 ? "AM" : i + 1 < 12 ? "AM" : "PM";

    slots.push(`${startHour} ${startPeriod} - ${endHour} ${endPeriod}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const Appointments = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [taskText, setTaskText] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");


  const todayKey = formatDate(new Date(), "yyyy-MM-dd");

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full p-2 transition-all duration-200 hover:scale-105"
        aria-label="Previous Month"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {formatDate(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full p-2 transition-all duration-200 hover:scale-105"
        aria-label="Next Month"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center font-semibold text-slate-600 py-3 bg-gradient-to-b from-slate-50 to-slate-100 border-b-2 border-slate-200 text-sm tracking-wide"
        >
          {dayNames[i]}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-7 rounded-t-lg overflow-hidden">
        {days}
      </div>
    );
  };

  const handleDateClick = (day) => {
    setSelectedTime("");
    setTaskText("");
    setPatientName("");
    setPatientId("");
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const formattedDate = formatDate(day, "d");
        const dateKey = formatDate(day, "yyyy-MM-dd");
        const isToday = isSameDay(day, new Date());
        const taskCount = tasks[dateKey]?.length || 0;

        days.push(
          <div
            key={day.getTime()}
            className={`p-3 h-[35px] cursor-pointer border border-slate-200 hover:bg-blue-50 transition-all duration-200 relative flex items-center justify-between group hover:shadow-sm
              ${!isSameMonth(day, monthStart)
                ? "text-slate-400 bg-slate-50 hover:bg-slate-100"
                : "text-slate-800 bg-white hover:bg-blue-50"
              }
              ${isToday
                ? "bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-300 shadow-sm"
                : ""
              }
            `}
            onClick={() => handleDateClick(cloneDay)}
          >
            <div
              className={`font-semibold text-sm transition-colors ${isToday ? "text-blue-700" : ""
                } ${!isSameMonth(day, monthStart) ? "text-slate-400" : ""}`}
            >
              {formattedDate}
            </div>
            {taskCount > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"></div>
                {taskCount > 1 && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
                    {taskCount}
                  </span>
                )}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-200 rounded"></div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.getTime()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div className="border-2 border-slate-200 rounded-xl overflow-hidden shadow-lg bg-white">
        {rows}
      </div>
    );
  };

  const handleTaskSubmit = () => {
    if (!selectedTime || !taskText || !patientName || !patientId) return;

    const dateKey = formatDate(selectedDate, "yyyy-MM-dd");

    setTasks((prev) => ({
      ...prev,
      [dateKey]: [
        ...(prev[dateKey] || []),
        { time: selectedTime, task: taskText },
      ],
    }));

    setSelectedTime("");
    setTaskText("");
    setIsModalOpen(false);

    console.log("Selected Time:", selectedTime);
    console.log("Task Text:", taskText);
    console.log("Patient Name:", patientName);
    console.log("Patient ID:", patientId);
  };

  const deleteTask = (dateKey, taskIndex) => {
    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, idx) => idx !== taskIndex),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto  max-h-screen">
      <div className="mb-8">
        <h1 className="text-xl  mt-5 font-bold text-gray-900 ">
          Appointment Manager
        </h1>
        <p className="text-gray-600">
          Manage your schedule and appointments efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-xl p-6 h-[380px] bg-gradient-to-br from-white to-slate-50">
            {renderHeader()}
            <div className="h-[370px] overflow-hidden">
              {renderDays()}
              {renderCells()}
            </div>
          </div>
        </div>

        {/* Today's Tasks Section */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-xl p-6 h-[500px] bg-gradient-to-br from-white to-slate-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Today's Appointments
            </h3>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
            {(tasks[todayKey] && tasks[todayKey].length > 0) ? (
              tasks[todayKey].map((task, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-lg shadow-sm bg-white hover:bg-blue-50 transition-all flex justify-between items-center"
                >
                  <div>
                    <div className="text-sm font-medium text-blue-800">
                      {task.time}
                    </div>
                    <div className="text-sm text-gray-700">{task.task}</div>
                  </div>
                  <button
                    onClick={() => deleteTask(todayKey, idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm">No appointments today.</div>
            )}
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {(tasks[todayKey] || []).length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-400 mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-500 font-medium">
                  No appointments scheduled for today
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Click on a date to add an appointment
                </p>
              </div>
            ) : (
              tasks[todayKey]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {t.task}
                      </div>
                      <div className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-lg inline-block mt-1">
                        {t.time}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(todayKey, idx)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Modal for Adding Tasks */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Appointment
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                Selected Date: {selectedDate && formatDate(selectedDate, "PPP")}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot, i) => (
                    <option key={i} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="Enter patient ID"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Details
                </label>
                <input
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  placeholder="Enter appointment details..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTaskSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Appointment
                </button>
              </div>
            </div>

            {/* Show existing tasks for selected date */}
            {selectedDate &&
              tasks[formatDate(selectedDate, "yyyy-MM-dd")]?.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Existing Appointments
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {tasks[formatDate(selectedDate, "yyyy-MM-dd")]
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((t, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <span className="font-medium">{t.time}</span> -{" "}
                            {t.task}
                          </div>
                          <button
                            onClick={() =>
                              deleteTask(
                                formatDate(selectedDate, "yyyy-MM-dd"),
                                idx
                              )
                            }
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
