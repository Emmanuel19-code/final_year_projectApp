import React, { createContext, useState, useEffect } from "react";

export const DateTimeContext = createContext();

const DateTimeProvider = ({ children }) => {
  const [dateTime, setDateTime] = useState({
    date: "",
    day: "",
    time: "",
    year: "",
  });

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

  return (
    <DateTimeContext.Provider value={{ ...dateTime, getFutureDate }}>
      {children}
    </DateTimeContext.Provider>
  );
};

export default DateTimeProvider;
