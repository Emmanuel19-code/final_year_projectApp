import React, { useState, useEffect, useContext } from "react";
import {
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";
import { STREAM_KEY } from "@env";
import { AllPostRequest } from "../context/allpostRequest";

const apiKey = STREAM_KEY;

const Meeting = ({ navigation, route }) => {
  const info = useSelector(selectInfo);
  const { SendMeetingId, error_message, setError_message } =
    useContext(AllPostRequest);
  const receivedId = route.params.callId;
  const appointmentId = route.params.id;
  const callstate = useCallStateHooks();
  const callId = receivedId ? receivedId : `call_${Date.now()}`;
  const user = {
    id: info?.role !== "user" ? info.healthworkerId : info?.uniqueId,
  };
  const { participantId, type } = route.params;
  const token = info?.stream_token;
  const [hasError, setHasError] = useState(false);
  const client = new StreamVideoClient({ apiKey, user, token });

  const call = client.call(
    type === "video" ? "default" : "audio_room",
    info?.role !== "user" ? callId : receivedId
  );

  call.join({ create: true });

  const sendId = async () => {
    try {
      const data = {
        meetingId: callId,
        patientId: participantId,
      };
      const response = await SendMeetingId(data, appointmentId);
    } catch (error) {
      console.error("Error sending meeting ID:", error);
      setHasError(true);
    }
  };

  useEffect(() => {
    if (info?.role !== "user") {
      sendId();
    }
  }, [info?.role, callId, participantId, appointmentId]);

  useEffect(() => {
    if (error_message || hasError) {
      navigation.goBack();
    }
  }, [error_message, hasError, navigation]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallContent />
      </StreamCall>
    </StreamVideo>
  );
};

export default Meeting;
