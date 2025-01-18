import Feed from "./components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen relative">
      <div className="absolute w-[300px] h-[300px] top-0 left-0 -z-10 hidden md:block">
        <Image src="/images/goat-1.webp" fill={true} alt="Cute goat 1"></Image>
      </div>
      <div className="absolute w-[300px] h-[300px] bottom-0 left-0 -z-10">
        <Image src="/images/goat-2.webp" fill={true} alt="Cute goat 2"></Image>
      </div>
      <div className="absolute w-[300px] h-[300px] top-0 right-0 -z-10">
        <Image src="/images/pig-1.webp" fill={true} alt="Cute pig 1"></Image>
      </div>
      <div className="absolute w-[300px] h-[300px] bottom-0 right-0 -z-10 hidden md:block">
        <Image src="/images/pig-2.webp" fill={true} alt="Cute pig 2"></Image>
      </div>
      <Feed />
    </div>
  );
}
