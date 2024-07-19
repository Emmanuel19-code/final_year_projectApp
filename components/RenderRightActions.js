import { View, Text, Pressable } from 'react-native'
import React from 'react'

const RenderRightActions = ({notificationId}) => {
  return (
    <Pressable className="bg-red-500 p-1  justify-center ">
        <Text className="text-white font-bold text-lg">Delete</Text>
    </Pressable>
  )
}

export default RenderRightActions