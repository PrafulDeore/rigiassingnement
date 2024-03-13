import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-extBlue">

      {/* //*Header */}
      <div className="w-full text-[55px] border px-[25px]">
        <Image
          src={'https://app.rigi.club/wp-content/themes/Rigi/assets/img/logo.svg'}
          width={100}
          height={80}
          alt="Picture of the author"
          // className="w-full"
        />
      </div>


    </div>
  );
}
