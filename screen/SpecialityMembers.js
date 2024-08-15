import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import DisplayDoc from "../components/DisplayDoc";
import { AllGetRequest } from "../context/allgetRequest";

const SpecialityMembers = ({ route }) => {
  const { specialty } = route.params;
  const { WorkersInDepartment } = useContext(AllGetRequest);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    search();
  }, [specialty]);

  const search = async () => {
    try {
      setIsloading(true);
      const response = await WorkersInDepartment(specialty);
      if (response) {
        setIsloading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
};

export default SpecialityMembers;
