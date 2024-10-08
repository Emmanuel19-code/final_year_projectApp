import React, { createContext, useState, useEffect } from "react";

export const DateTimeContext = createContext();

const DateTimeProvider = ({ children }) => {
  const [futureDates, setFutureDates] = useState([]);
  const [pickedDay, setPickedDay] = useState("");
  const [workingDays, setWorkingDays] = useState([]);

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
      month: months[futureDate.getMonth()],
    };
  };

  useEffect(() => {
    const dates = [];
    for (let day = 0; day < 10; day++) {
      const futureDateData = getFutureDate(day);
      dates.push({
        id: day,
        data: futureDateData,
        isAvailable: workingDays?.includes(futureDateData?.day),
      });
    }
    setFutureDates(dates);
  }, [workingDays]);

  const GenerateTimeSlots = (date) => {
    let startTime = new Date(date);
    let endTime = new Date(date);
    startTime.setHours(8, 0, 0, 0);
    endTime.setHours(24, 0, 0, 0);

    let availableTimes = [];
    let id = 0;

    while (startTime < endTime) {
      let hours = startTime.getHours();
      let minutes = startTime.getMinutes();
      let hoursString = hours < 10 ? "0" + hours : hours;
      let minutesString = minutes < 10 ? "0" + minutes : minutes;
      let timeString = hoursString + ":" + minutesString;

      availableTimes.push({ id: id++, time: timeString });

      startTime.setHours(startTime.getHours() + 1);
    }

    return availableTimes;
  };

  return (
    <DateTimeContext.Provider
      value={{
        futureDates: futureDates.filter((date) => date.isAvailable),
        pickedDay,
        setPickedDay,
        GenerateTimeSlots,
        setWorkingDays,
      }}
    >
      {children}
    </DateTimeContext.Provider>
  );
};

export default DateTimeProvider;
