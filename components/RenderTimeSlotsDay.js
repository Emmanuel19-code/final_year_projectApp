import { View, Text } from 'react-native'
import React from 'react'
import TimeSlots from './TimeSlots';

const RenderTimeSlotsDay = ({timeslots,day}) => {
  if (timeslots.length === 0) {
    return <Text>No time available</Text>;
  }
  return (
    <View className="bg-red-500">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {timeslots.map((item, key) => {
          const hour = item.time.toString().padStart(2, "0");
          const formattedCurrentHour = currentHour.toString().padStart(2, "0");
          return (
            (hour < formattedCurrentHour || hour !== formattedCurrentHour) &&
            currentHour < 12 && (
              <TimeSlots
                key={key}
                timeslots={timeslots}
                onItemSelect={handleTimeSlots}
                id={item.id}
                time={item.time}
              />
            )
          );
        })}
      </ScrollView>
    </View>
  );
}

export default RenderTimeSlotsDay