"use client"

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PeriodTracker() {
  const [startDate, setStartDate] = useState("");
  const [periodLength, setPeriodLength] = useState(5);
  const [nextPeriodDate, setNextPeriodDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [activeTab, setActiveTab] = useState("manual"); // 'manual' or 'csv'
  const fileInputRef = useRef(null);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarDays, setCalendarDays] = useState([]);
  const [periodDates, setPeriodDates] = useState([]);

  // Generate calendar days for the current month
  useEffect(() => {
    generateCalendarDays(currentMonth, currentYear);
  }, [currentMonth, currentYear, periodDates]);

  // Update period dates when startDate or nextPeriodDate changes
  useEffect(() => {
    if (startDate) {
      const dates = [];
      const start = new Date(startDate);

      // Add current period dates
      for (let i = 0; i < periodLength; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }

      // Add next period dates if available
      if (nextPeriodDate) {
        const nextStart = new Date(nextPeriodDate);
        for (let i = 0; i < periodLength; i++) {
          const date = new Date(nextStart);
          date.setDate(nextStart.getDate() + i);
          dates.push(date);
        }
      }

      setPeriodDates(dates);
    }
  }, [startDate, nextPeriodDate, periodLength]);

  const generateCalendarDays = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayWeekday;

    // Calculate total days to show (42 = 6 rows of 7 days)
    const totalDays = 42;

    const days = [];

    // Add days from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
      const date = new Date(prevMonthYear, prevMonth, i);
      days.push({
        date,
        isCurrentMonth: false,
        isPeriod: isPeriodDate(date),
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isPeriod: isPeriodDate(date),
      });
    }

    // Add days from next month
    const remainingDays = totalDays - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(nextMonthYear, nextMonth, i);
      days.push({
        date,
        isCurrentMonth: false,
        isPeriod: isPeriodDate(date),
      });
    }

    setCalendarDays(days);
  };

  const isPeriodDate = (date) => {
    return periodDates.some(
      (periodDate) =>
        periodDate.getDate() === date.getDate() &&
        periodDate.getMonth() === date.getMonth() &&
        periodDate.getFullYear() === date.getFullYear()
    );
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getMonthName = (month) => {
    const monthNames = [
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
    return monthNames[month];
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call - replace with your actual API endpoint
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ startDate, periodLength }),
      // })
      // const data = await response.json()
      // setNextPeriodDate(data.nextPeriodDate)

      // Simulating API response for demonstration
      setTimeout(() => {
        // Calculate next period date (28 days after start date)
        const startDateObj = new Date(startDate);
        const nextDate = new Date(startDateObj);
        nextDate.setDate(startDateObj.getDate() + 28);
        setNextPeriodDate(formatDate(nextDate));
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching next period date:", error);
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("Uploading...");

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/periodTracker`, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log(data)
        setUploadStatus("Upload successful!");
        // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
    setNextPeriodDate(formatDate(new Date(data?.data?.next_predicted_period_start_date)));
    setStartDate(formatDate(new Date(data?.data?.next_predicted_period_start_date)));
    


    } catch (error) {
        console.error("Error uploading CSV:", error);
        setUploadStatus("Upload failed. Please try again.");
    }
    };


      // Simulating API response for demonstration
//       setTimeout(() => {
//         setUploadStatus("Upload successful!");
//         // Reset file input
//         if (fileInputRef.current) fileInputRef.current.value = "";

//         // Simulate getting next period date from CSV data
//         const today = new Date();
//         const nextDate = new Date(today);
//         nextDate.setDate(today.getDate() + 14);
//         setNextPeriodDate(formatDate(nextDate));

//         // Simulate getting start date from CSV data
//         const simulatedStartDate = new Date(today);
//         simulatedStartDate.setDate(today.getDate() - 14);
//         setStartDate(formatDate(simulatedStartDate));
//       }, 1500);
//     } catch (error) {
//       console.error("Error uploading CSV:", error);
//       setUploadStatus("Upload failed. Please try again.");
//     }
//   };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Navbar/>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pink-600 mb-2">Period Tracker</h1>
            <p className="text-gray-600">Track your menstrual cycle with ease and accuracy</p>
          </header>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md inline-flex">
              <button
                onClick={() => setActiveTab("manual")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "manual" ? "bg-pink-600 text-white" : "text-gray-600 hover:bg-pink-100"
                }`}
              >
                Manual Input
              </button>
              <button
                onClick={() => setActiveTab("csv")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "csv" ? "bg-pink-600 text-white" : "text-gray-600 hover:bg-pink-100"
                }`}
              >
                CSV Upload
              </button>
            </div>
          </div>

          {/* Input Forms */}
          <div className="mb-8">
            {activeTab === "manual" ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Period Details</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Last Period Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="periodLength" className="block text-sm font-medium text-gray-700">
                      Average Period Length (days)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        id="periodLength"
                        min="1"
                        max="10"
                        value={periodLength}
                        onChange={(e) => setPeriodLength(Number.parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{periodLength} days</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !startDate}
                    className="w-full py-3 px-4 bg-pink-600 text-white font-medium rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Calculating..." : "Calculate Next Period"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Period History</h2>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Upload your period history as CSV</p>
                        <p className="text-xs text-gray-500 mt-1">Format: date,length (e.g., 2023-01-01,5)</p>
                      </div>
                      <div>
                        <label className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-lg cursor-pointer hover:bg-pink-200 transition-colors">
                          Choose File
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
                            ref={fileInputRef}
                          />
                        </label>
                      </div>
                      {uploadStatus && (
                        <p
                          className={`text-sm ${uploadStatus.includes("successful") ? "text-green-600" : uploadStatus.includes("failed") ? "text-red-600" : "text-gray-600"}`}
                        >
                          {uploadStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next Period Prediction */}
          {nextPeriodDate && (
            <div className="mb-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
              <h2 className="text-2xl font-semibold mb-4">Your Next Period</h2>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 inline-block">
                  <div className="text-4xl font-bold">
                    {new Date(nextPeriodDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="mt-2 text-sm opacity-80">Mark your calendar!</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-80">Period Length</div>
                  <div className="text-xl font-semibold">{periodLength} days</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-80">Cycle Length</div>
                  <div className="text-xl font-semibold">28 days</div>
                </div>
              </div>
            </div>
          )}

          {/* Calendar View */}
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calendar View</h2>

            <div className="calendar">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-xl font-medium text-gray-800">
                  {getMonthName(currentMonth)} {currentYear}
                </h3>
                <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      relative h-12 flex items-center justify-center text-sm rounded-lg
                      ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-800"}
                      ${day.isPeriod ? "bg-pink-100" : "hover:bg-gray-100"}
                      ${
                        day.date &&
                        day.date.getDate() === new Date().getDate() &&
                        day.date.getMonth() === new Date().getMonth() &&
                        day.date.getFullYear() === new Date().getFullYear()
                          ? "ring-2 ring-pink-500"
                          : ""
                      }
                    `}
                  >
                    {day.date?.getDate()}
                    {day.isPeriod && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                  <span className="text-gray-600">Period Days</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full ring-2 ring-pink-500 mr-2"></div>
                  <span className="text-gray-600">Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Period Health Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-pink-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Self-Care</h3>
                <p className="text-gray-600 text-sm">
                  Take time for yourself. Warm baths, gentle exercise, and adequate rest can help manage symptoms.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-pink-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Nutrition</h3>
                <p className="text-gray-600 text-sm">
                  Stay hydrated and eat iron-rich foods. Reduce salt, sugar, caffeine, and alcohol to minimize symptoms.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-pink-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Track Symptoms</h3>
                <p className="text-gray-600 text-sm">
                  Note mood changes, cramps, and flow. Consistent tracking helps identify patterns and potential issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}

