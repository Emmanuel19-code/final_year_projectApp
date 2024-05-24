import React, { createContext, useState, useEffect } from "react";

export const DateTimeContext = createContext();

const DateTimeProvider = ({ children }) => {
  const [dateTime, setDateTime] = useState({
    date: "",
    day: "",
    time: "",
    year: "",
    month: "",
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentHour, setCurrentHour] = useState(0);
  const [futureDates, setFutureDates] = useState([]);
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
    const date = now.toLocaleDateString();
    const day = days[now.getDay()];
    const time = now.toLocaleTimeString();
    const year = now.getFullYear().toString();
    const month = months[now.getMonth()];
    setDateTime({ date, day, time, year, month });
  };

  //generate future dates
  const getFutureDate = (daysAhead) => {
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
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    return {
      date: futureDate.toLocaleDateString(),
      day: futureDate.toLocaleDateString("en-US", { weekday: "long" }),
      year: futureDate.getFullYear().toString(),
      month: months[futureDate.getMonth().toString()],
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
  //This function generates the time slots
  const generateTimeSlots = (startTime, endTime, interval) => {
    const times = [];
    let currentTime = new Date(startTime);
    let id = 0;
    while (currentTime <= endTime) {
      times.push({
        id: id++,
        time: currentTime.toTimeString().slice(0, 2),
      }); // Get HH:MM format
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
    //setting the starting time to  am
    startTime.setHours(8, 0, 0, 0, 0);
    // Generate new time slots
    const slots = generateTimeSlots(startTime, endTime, 120); // 1 hour interval
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
  useEffect(() => {
    const dates = [];
    for (let day = 0; day < 7; day++) {
      const futureDateData = getFutureDate(Number(day));
      dates.push({
        id: day,
        data: futureDateData,
      });
    }
    setFutureDates(dates);
  }, []);
  // Filtered morning slots
  const morningSlots = timeSlots.filter((item) => item.time < 12);

  // Filtered evening slots
  const eveningSlots = timeSlots.filter((item) => item.time >= 12);
  return (
    <DateTimeContext.Provider
      value={{
        ...dateTime,
        getFutureDate,
        timeSlots,
        currentHour,
        futureDates,
        morningSlots,
        eveningSlots
      }}
    >
      {children}
    </DateTimeContext.Provider>
  );
};

export default DateTimeProvider;
