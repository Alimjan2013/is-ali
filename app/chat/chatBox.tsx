"use client"

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { useCallback } from "react";

const VideoChat = () => {
  
  const localTracksRef = useRef<HTMLDivElement>();
  const remoteTracksRef = useRef<HTMLDivElement>();
  const userName = useRef<HTMLInputElement>(null);

  const joinRoom = useCallback(async () => {

    // TODO: 获取token，

    const { default: QNRTC } = await import('qnweb-rtc');
    const userId = userName.current?.value;
    const client = QNRTC.createClient();
    console.log(QNRTC.VERSION)
    autoSubscribe(client);
    const roomToken = await getRoomToken(userId as string);
    
    await client.join(roomToken);

    console.log("joinRoom success!");
    await publish(client);
  }, []);

  const publish = async (client: any) => {
    const { default: QNRTC } = await import('qnweb-rtc');

    const localTracks = await QNRTC.createMicrophoneAndCameraTracks();
    console.log("my local tracks", localTracks);
    await client.publish(localTracks);
    console.log("publish success!");

    for (const localTrack of localTracks) {
      console.log(localTrack);
      if (localTrack.isAudio()) continue;
      if (localTracksRef.current) {
        localTrack.play(localTracksRef.current, {
          mirror: true,
        });
      }
    }
  };

  const subscribe = async (client: any, tracks: any) => {
    const remoteTracks = await client.subscribe(tracks);
    for (const remoteTrack of [
      ...remoteTracks.videoTracks,
      ...remoteTracks.audioTracks,
    ]) {
      remoteTrack.play(remoteTracksRef.current);
    }
  };

  const autoSubscribe = (client: any) => {
    client.on("user-published", (userId: any, tracks: any) => {
      console.log("user-published!", userId, tracks);
      subscribe(client, tracks)
        .then(() => console.log("subscribe success!"))
        .catch((e) => console.error("subscribe error", e));
    });
  };

  async function getRoomToken(userName: string) {
    try {
        const response = await fetch("https://getroomtoken.deno.dev/api/token", {
            method: "POST",
            body: JSON.stringify({ userId: userName, roomName: "oneRoom" }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.token; // assuming the token is returned in the 'token' property
    } catch (error) {
        console.error('Failed to get room token:', error);
        return null;
    }
}

  // useEffect(() => {
  //   // joinRoom();
  // }, [joinRoom]);

  return (
    <div className="p-10 space-y-4">
      <div className="space-y-2">
        <label>请输入 RoomToken 加入房间开始连麦</label>
        <div className="flex flex-row gap-3">
          <Input ref={userName} type="text" />
          <Button onClick={joinRoom}>加入房间</Button>
        </div>
      </div>

      <div className="flex flex-row">
        <div className=" ">
          <p>本地视频</p>
          <div className="w-[400px] bg-slate-300" ref={localTracksRef as React.RefObject<HTMLDivElement>}></div>
        </div>
        <div>
          <p>远端视频</p>
          <div className="w-[400px] bg-slate-300" ref={remoteTracksRef as React.RefObject<HTMLDivElement>}></div>
        </div>
      </div>
    </div>
  );
};

export default function videoInfo() {
  return (
    <div className="flex-1 space-x-3 flex flex-row">
      <div className="w-full h-full border-4 md:border-8  border-black">
        <VideoChat />
      </div>
    </div>
  );
}
