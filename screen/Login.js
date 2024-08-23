import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllPostRequest } from "../context/allpostRequest";
import * as Progress from "react-native-progress";
import { useDispatch } from "react-redux";
import { Logged, SetUser } from "../store/authSlice";
import { saveToken } from "../store/tokenSlice";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const navigationRef = useRef(navigation); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();

  const {
    UserSignIn,
    error_message,
    setError_message,
    setSucessMessage,
    successMessage,
  } = useContext(AllPostRequest);

  
  const user = useCallback(async () => {
    setIsloading(true);
    setDisable(true);
    const response = await UserSignIn(email.trim(), password.trim());
    if (response) {
      setIsloading(false);
      setDisable(false);
      dispatch(
        saveToken({
          refreshToken: response.data.userInfo.refreshtoken,
          accessToken: response.data.userInfo.accesstoken,
        })
      );
      dispatch(SetUser(response.data.userInfo));
      dispatch(Logged(response.data.userInfo.role));

      
      showToast("Login successful", "success");
      setTimeout(() => {
        navigationRef.current.navigate("home");
      }, 5000);
    }
  }, [dispatch, email, password, UserSignIn]);


  const showToast = useCallback((message, type) => {
    Toast.show({
      type: type,
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 40,
    });
  }, []);

  
  useEffect(() => {
    if (error_message) {
      setIsloading(false);
      setDisable(false);
      showToast(error_message, "error");
      setError_message(""); 
    }
  }, [error_message, setError_message, showToast]);

  
  useEffect(() => {
    if (successMessage) {
      setIsloading(false);
      dispatch(Logged());
      showToast(successMessage, "success");
      const timer = setTimeout(() => {
        setSucessMessage("");
        
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, setSucessMessage, showToast]);

  
  useEffect(() => {
    setDisable(email === "" || password === "" || password.length < 8);
  }, [email, password]);

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
      <View className="p-2 h-screen">
        <View className="mt-5">
          <Text className="text-xl font-bold m-1">Sign In</Text>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300">Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text className="ml-2 text-blue-600 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center m-1">
            <Text className="text-gray-300">A Healthcare Professional?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("healthprofessionalauth")}
            >
              <Text className="ml-2 text-blue-600 font-bold">Sign In Here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="m-2">
          <Text className="m-1">Email</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 rounded"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="m-2">
          <Text className="m-1">Password</Text>
          <TextInput
            placeholder="***********"
            className="border border-gray-400 p-1 rounded"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          className={
            disable
              ? "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center opacity-60"
              : "bg-blue-700 p-3 rounded m-2 flex items-center flex-row justify-center"
          }
          onPress={user}
          disabled={disable}
        >
          {isloading && (
            <View className="mr-4">
              <Progress.Circle size={20} indeterminate={true} color="white" />
            </View>
          )}
          <Text className="text-white font-bold text-center">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
