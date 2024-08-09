import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import DisplayDoc from '../components/DisplayDoc'

const SpecialityMembers = ({route}) => {
    const {specialty} = route.params
  return (
    <View className="p-1 bg-gray-50 h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
        <DisplayDoc />
      </ScrollView>
    </View>
  );
}

export default SpecialityMembers