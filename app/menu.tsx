import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Menu as MenuIcon,
} from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function Menu() {
  return (
    <div className="lg:min-w-[200px]  lg:w-1/5 flex ">
      <div className="md:hidden flex justify-between flex-1 px-4 py-2">
        <p className="text-xl font-semibold">is-ali.tech</p>
        <Drawer>
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
            <MenuContent></MenuContent>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden  md:flex ">
        <MenuContent></MenuContent>
      </div>
    </div>
  );
}

function MenuContent() {
  return (
    <div className="space-y-6 md:border-8 border-4 rounded-md border-amber-200 lg:px-8 xl:px-12 px-6 grow flex-col items-center md:py-10  py-6 lg:m-4 m-2 lg:space-y-10">
      <div className="space-y-4 flex flex-col items-center w-full">
        <Image
          className="lg:border-4 border-2 border-zinc-400 rounded-full md:w-24 md:h-24 w-16 h-16"
          width={100}
          height={100}
          src={"/Alimjan-Profile.jpg"}
          alt="profile"
        ></Image>
        <p className="text-xl lg:text-2xl font-bold text-center">
          Alimjan Ablimit
        </p>
        <div className="flex  justify-between w-full">
          <Link href={"https://github.com/Alimjan2013"} target="_blank">
            <Github />
          </Link>
          <Link href={"https://twitter.com/AlimjanAblimit"} target="_blank">
            <Twitter />
          </Link>

          <Linkedin className=" text-gray-400" />
          <Link href={"mailto:alimjan.com@hotmail.com"} target="_blank">
            <Mail />
          </Link>
        </div>
      </div>

      <div className="space-y-4 flex flex-1 flex-col items-center md:items-start w-full font-medium text-2xl ">
        <Link aria-disabled className="font-bold" href={"#"}>
          Home
        </Link>
        <Link href={"#"}> CV</Link>
        <Link href={"#"}> Project</Link>
        <Link
          className="flex"
          target="_blank"
          href={
            "https://alimjan.notion.site/Is-Ali-7b3453d3c328479da2a2a838c2deaefe"
          }
        >
          Blog
          <svg
            data-testid="geist-icon"
            fill="none"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M7 17L17 7"></path>
            <path d="M7 7h10v10"></path>
          </svg>
        </Link>

        <div className="text-sm flex-1 text-zinc-500 flex flex-col items-center">
          <p className="">
            My site is currently under construction, but in the meantime,
            you&apos;re warmly invited to learn more about me through my project
            blog.
          </p>
          
        </div>
      </div>
    </div>
  );
}
