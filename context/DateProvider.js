import React, { createContext, useState, useEffect } from "react";

export const DateTimeContext = createContext();

const DateTimeProvider = ({ children }) => {
  const [dateTime, setDateTime] = useState({
    date: "",
    day: "",
    time: "",
    year: "",
  });
const [timeSlots, setTimeSlots] = useState([]);
const [currentHour, setCurrentHour] = useState(0);
  const updateDateTime = () => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = now.toLocaleDateString();
    const day = days[now.getDay()];
    const time = now.toLocaleTimeString();
    const year = now.getFullYear().toString();

    setDateTime({ date, day, time, year });
  };

  //generate future dates
  const getFutureDate = (daysAhead) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    return {
      date: futureDate.toLocaleDateString(),
      day: futureDate.toLocaleDateString("en-US", { weekday: "long" }),
      year: futureDate.getFullYear().toString(),
    };
  };

  useEffect(() => {
    // Update every second
    const intervalId = setInterval(updateDateTime, 1000);
    // Initial call to set the date/time immediately
    updateDateTime();
    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  const generateTimeSlots = (startTime, endTime, interval) => {
    const times = [];
    let currentTime = new Date(startTime);
    while (currentTime <= endTime) {
      times.push(currentTime.toTimeString().slice(0, 2)); // Get HH:MM format
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }
    return times;
  };
  const updateTimeSlots = () => {
    const now = new Date();
    const startTime = new Date(now);
    const endTime = new Date(now);

    // Set the end time to the end of the working hours (e.g., 5:00 PM)
    endTime.setHours(24, 0, 0, 0);

    // Generate new time slots
    const slots = generateTimeSlots(startTime, endTime, 60); // 30-minute interval
    //console.log("this is the time", slots);
    setTimeSlots(slots);
  };
  useEffect(() => {
    updateTimeSlots(); // Initial call to populate time slots
    const intervalId = setInterval(updateTimeSlots, 6000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
    useEffect(() => {
      const updateHour = () => {
        const now = new Date();
        setCurrentHour(now.getHours());
      };

      // Update the current hour initially and then every hour
      updateHour();
      const intervalId = setInterval(updateHour, 3600000); // Update every hour

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
  return (
    <DateTimeContext.Provider value={{ ...dateTime, getFutureDate,timeSlots,currentHour }}>
      {children}
    </DateTimeContext.Provider>
  );
};

export default DateTimeProvider;
