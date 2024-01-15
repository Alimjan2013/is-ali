import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center space-y-2">
      <div className="flex-1 bg-amber-300 w-full p-8  md:p-14 border-4 md:border-8  border-black flex items-end flex-col">
        <p className="md:text-9xl text-7xl">I&apos;m Alimjan</p>
        <p className="md:text-8xl text-6xl">Ablimit</p>
      </div>
      <div className="flex flex-1 bg-amber-300 w-full px-8  md:px-36 border-4 md:border-8 border-black">
        <div className="space-y-2 bg-white flex-1 flex flex-col items-center justify-between py-6 px-16  md:px-36 md:text-2xl text-xl font-semibold">
          <p className="w-full">i ❤️ Web Development</p>
          <p className="w-full">i ❤️ UI/UX</p>
          <p className="w-full">i ❤️ iOS Development</p>
          <p className="w-full">i ❤️ Open Source</p>
          <p className="w-full">i ❤️ ZJU</p>
        </div>
      </div>
    </main>
  );
}
