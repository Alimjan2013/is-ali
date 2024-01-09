import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center space-y-2">
      <div className="h-full bg-amber-300 w-full p-14 border-8 border-black flex items-end flex-col">
        <p className="text-9xl">I&apos;m Alimjan</p>
        <p className="text-8xl">Ablimit</p>
      </div>
      <div className="h-full bg-amber-300 w-full px-36 border-8 border-black">
        <div className="space-y-2 bg-white h-full flex flex-col items-center justify-between py-6 px-36 text-2xl font-semibold">
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
