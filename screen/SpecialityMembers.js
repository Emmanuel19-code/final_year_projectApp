import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import DisplayDoc from "../components/DisplayDoc";
import { AllGetRequest } from "../context/allgetRequest";

const SpecialityMembers = ({ route }) => {
  const { specialty } = route.params;
  const { WorkersInDepartment } = useContext(AllGetRequest);
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    search();
  }, [specialty]);

  const search = async () => {
    try {
      setIsloading(true);
      const response = await WorkersInDepartment(specialty);
      if (response) {
        setData(response.data.workers);
        console.log(response.data.workers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false); 
    }
  };

  return (
    <View className="p-1 bg-gray-50 h-full">
      {isloading ? (
        <View className="h-72 justify-center items-center">
          <View className="mt-10">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        </View>
      ) : data?.length === 0 ? (
        <View className="w-96 justify-center flex flex-row h-72 items-center">
          <Text className="text-center mt-10 font-bold w-52">
            No Doctors Where Found
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item) => (
            <DisplayDoc key={item.id} {...item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SpecialityMembers;
