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
  const [activeVideo, setActiveData] = useState({ sources: [], thumb: { src: '' } })
  console.log("activeVideoactiveVideo", activeVideo?.thumb);

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

      <div className="flex border">

        {/* // * ReactPlayer */}
        <div className="  px-[100px] max-w-[2000px] w-full">
          {isClient &&
            <DynamicReactPlayer
              url={activeVideo?.sources[0]}
              controls={true}
              playing={true}
              width="100%"
              height="800px"
              previewTabIndex={0}
              light={<img src={activeVideo?.thumb?.src} alt='Thumbnail' style={{ width: '2000px ' }} />}
              pip={true}
            />}
        </div>


        <div className="flex flex-col border max-w-[600px] w-full">
          <p className="text-[25px]  font-semibold px-[10px] py-[25px] bg-darkBlue w-full mb-[10px]">Playlist</p>
          <VideoList setActiveData={setActiveData} />
        </div>
      </div>
    </div>
  );
}
