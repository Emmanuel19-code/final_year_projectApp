import { Text, TouchableOpacity,View } from 'react-native'
import React, { useState } from 'react'


const SelectAppointmentDate = ({ id, day, daydate, selectedItemId, onItemSelect }) => {
  const handleSelect = () => {
    onItemSelect(id);
  };
  return (
    <View className="mt-2">
      <Text className={"font-bold  text-center"}>{day.slice(0,3)}</Text>
      <TouchableOpacity
        className={
          selectedItemId === id
            ? "w-12 m-2 h-14 mt-1 border items-center justify-center border-teal-400 bg-teal-400 rounded"
            : "w-12 m-2 h-14 mt-1 border items-center justify-center border-teal-400 rounded"
        }
        onPress={handleSelect}
        key={id}
      >
        <Text className={"font-bold"}>{daydate.split("/")[1]}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectAppointmentDate

