'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { videoData } from './videoData';
import { VideoList } from "./Component/VideoList";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeVideo, setActiveData] = useState({ sources: [] })
  console.log("activeVideo", activeVideo);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-extBlue">
      {/* Header */}
      <div className="w-full text-[55px] border px-[25px]">
        <Image
          src={'https://app.rigi.club/wp-content/themes/Rigi/assets/img/logo.svg'}
          width={150}
          height={80}
          alt="Rigi Logo"
          className="my-[20px]"
        />
      </div>


      {/* // * ReactPlayer */}
      <div className="border w-full flex justify-center items-center">

        {isClient &&
          <DynamicReactPlayer
            //  url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            url={activeVideo?.sources[0]}
            controls={true}
            playing={true}

          />}

      </div>


      <div className="border flex justify-center items-center">
        <VideoList setActiveData={setActiveData} />
      </div>
    </div>
  );
}
