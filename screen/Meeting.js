import React, { useState, useEffect } from "react";
import {
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useSelector } from "react-redux";
import { selectInfo } from "../store/authSlice";
import { STREAM_KEY } from "@env";

const apiKey = STREAM_KEY;

const Meeting = ({ navigation, route }) => {
  const info = useSelector(selectInfo);
  const callId = `call_${Date.now()}`;
  const user = { id: info.healthworkerId };
  const { participantId, type } = route.params;
  const token = info?.stream_token;
  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call(type == "video" ? "default" : "audio_room", callId);
  call.join({ create: true });
  
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallContent />
      </StreamCall>
    </StreamVideo>
  );
};

export default Meeting;
