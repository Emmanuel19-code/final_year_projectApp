import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { selectInfo } from "../store/authSlice";
import { useSelector } from "react-redux";

const days = [
  {
    id: 0,
    day: "Sunday",
  },
  {
    id: 1,
    day: "Monday",
  },
  {
    id: 2,
    day: "Tuesday",
  },
  {
    id: 3,
    day: "Wednesday",
  },
  {
    id: 4,
    day: "Thursday",
  },
  {
    id: 5,
    day: "Friday",
  },
  {
    id: 6,
    day: "Saturday",
  },
];

const SelectWorkingDays = ({ setWorkingDays }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const info = useSelector(selectInfo)
  const handleDayPress = (day) => {
    setSelectedDays((prev) =>
      prev.some((selectedDay) => selectedDay.id === day.id)
        ? prev.filter((selectedDay) => selectedDay.id !== day.id)
        : [...prev, day]
    );
  };
 useEffect(() => {
   if (info?.workingdays) {
     setSelectedDays(days.filter((day) => info?.workingdays?.includes(day.day)));
   }
 }, [info.workingdays]);
  useEffect(() => {
    setWorkingDays(selectedDays);
  }, [selectedDays, setWorkingDays]);
  return (
    <View className=" flex flex-row items-center justify-between flex-wrap">
      {days.map((day, index) => (
        <TouchableOpacity
          key={day.id}
          className={
            selectedDays.some((selectedDay) => selectedDay.id === day.id)
              ? "w-24  bg-[#007BFF] p-2 rounded m-2"
              : "w-24 border  border-gray-300 p-2 rounded m-2"
          }
          onPress={() => handleDayPress(day)}
        >
          <Text
            className={
              selectedDays.some((selectedDay) => selectedDay.id === day.id)
                ? "text-center text-gray-200"
                : "text-center"
            }
          >
            {day.day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SelectWorkingDays;
