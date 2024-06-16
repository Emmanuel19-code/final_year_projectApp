import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";


const TimeSlots = ({time,onItemSelect,id,timeslots}) => {
       const handleSelect = () => {
         onItemSelect(id);
         console.log(timeslots);
       };
  return (
    <TouchableOpacity
      className={
          timeslots === id
            ? "w-36 m-2 h-10 flex-row border items-center justify-center border-teal-400 bg-teal-400 rounded"
            : "w-36 m-2 h-10 flex-row border items-center justify-center border-teal-400 rounded"
        }
      onPress={handleSelect}
    >
      <Text className="text-center font-bold text-lg m-1">{time}</Text>
      <Text className="font-bold text-lg m-1">:</Text>
      <Text className="font-bold text-lg m-1">00</Text>
    </TouchableOpacity>
  );
};

export default TimeSlots;
