import { View, ScrollView } from "react-native";
import React from "react";
import IndividualSpecialist from "../components/IndividualSpecialist";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    type: "General Practitioner",
    image: require("../assets/nurse.png"),
    description: "Diagnosing and Treating Cancer",
  },
  {
    type: "Oncologist",
    image: require("../assets/nurse_white.png"),
    description: "Diagnosing and Treating Cancer",
  },
  {
    type: "Optometrist",
    image: require("../assets/optometrist.png"),
    description: "Provides comprehensive eye care and vision correction",
  },
  {
    type: "Dentist",
    image: require("../assets/dentist.png"),
    description: "Treats teeth, gums, and mouth",
  },
];

const MedicalSpecialist = () => {
  const navigation = useNavigation();

  return (
    <View className="p-1 bg-gray-50 h-full">
      <ScrollView>
        {data.map((item) => (
          <IndividualSpecialist
            key={item.type}
            type={item.type}
            description={item.description}
            image={item.image}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MedicalSpecialist;
