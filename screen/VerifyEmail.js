import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, Pressable, TextInput,TouchableOpacity} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectRole } from "../store/authSlice";
import { AllPostRequest } from "../context/allpostRequest";
import * as Progress from "react-native-progress";

const VerifyEmail = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const user_role = useSelector(selectRole);
  const { VerifyUser, error_message, setError_message } =
    useContext(AllPostRequest);
  const [disable,setDisable] = useState(true)
  const [isloading, setIsloading] = useState(false);
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [activationcode,setActivationcode] = useState("")
  const code1Ref = useRef(null);
  const code2Ref = useRef(null);
  const code3Ref = useRef(null);
  const code4Ref = useRef(null);
 

  const handleVerify = async () => {
    setDisable(true)
    setIsloading(true)
    let data = {
      activationcode:activationcode,
    };
    if(user_role == "user"){
      const response = await VerifyUser(data);
      if(response){
console.log(response);
      }
      
      //navigation.navigate("home");
    }
   
  };

  const handleChangeText = (text, setCode, nextRef) => {
    setCode(text);
    if (text.length === 1 && nextRef) {
      nextRef.current.focus();
    }
  };
 useEffect(() => {
  setActivationcode(`${code1}${code2}${code3}${code4}`)
   if (activationcode.length == 4) {
     setDisable(false);
   }
 }, [activationcode,code1,code2,code3,code4]);

  useEffect(() => {
    if (error_message) {
      setIsloading(false);
      setDisable(false);
      const timer = setTimeout(() => {
        setError_message("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error_message, setError_message]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="p-2">
        <View></View>
        <View className="mt-10">
          <Text className="font-bold text-2xl">Verify your email</Text>
          <Text className="text-gray-400 font-bold">
            Enter 6-digit code sent to ********@gmail.com
          </Text>
        </View>
        <View className="flex flex-row items-center mt-5 justify-center">
          <View className="m-1">
            <TextInput
              ref={code1Ref}
              className="w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500"
              value={code1}
              onChangeText={(text) =>
                handleChangeText(text, setCode1, code2Ref)
              }
              maxLength={1}
              keyboardType="number-pad"
              clearButtonMode="while-editing"
              textAlign="center"
            />
          </View>
          <View className="m-1">
            <TextInput
              ref={code2Ref}
              className="w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500"
              value={code2}
              onChangeText={(text) =>
                handleChangeText(text, setCode2, code3Ref)
              }
              maxLength={1}
              keyboardType="number-pad"
              clearButtonMode="while-editing"
              textAlign="center"
            />
          </View>
          <View className="m-1">
            <TextInput
              ref={code3Ref}
              className="w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500"
              value={code3}
              onChangeText={(text) =>
                handleChangeText(text, setCode3, code4Ref)
              }
              maxLength={1}
              keyboardType="number-pad"
              clearButtonMode="while-editing"
              textAlign="center"
            />
          </View>
          <View className="m-1">
            <TextInput
              ref={code4Ref}
              className="w-12 h-12 p-1 bg-gray-200 border-b-2 border-teal-500"
              value={code4}
              onChangeText={(text) =>
                handleChangeText(text, setCode4, null)
              }
              maxLength={1}
              keyboardType="number-pad"
              clearButtonMode="while-editing"
              textAlign="center"
            />
          </View>
          
        </View>
        <TouchableOpacity
          className={
            disable
              ? "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center opacity-60"
              : "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center"
          }
          onPress={handleVerify}
          disabled={disable}
        >
          {isloading && (
            <View className="mr-4">
              <Progress.Circle size={20} indeterminate={true} color="white" />
            </View>
          )}
          <Text className="text-white font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex flex-row items justify-center mt-5">
          <Text className="">Didn't get code? </Text>
          <Text className="font-bold border-b-2">Try again</Text>
        </View>
      </View>
    </View>
  );
};

export default VerifyEmail;
9