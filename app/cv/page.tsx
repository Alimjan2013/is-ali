import CVBlock from "./cvContent";
import EduBlock from "./educationBlock";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {

  Linkedin,

} from "lucide-react";

export default function Cv() {
  return (
    <div className="p-4 space-y-6 flex-1">
      <div>
        <h1 className="text-2xl font-semibold">Skills</h1>
        <div>
          <CVBlock></CVBlock>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Education</h1>
        <div>
          <EduBlock></EduBlock>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p> see more in </p>
       
        <Button variant="secondary" size={"sm"}>
          <Linkedin className="mr-2 h-4 w-4"></Linkedin>
          <Link
            href={"https://www.linkedin.com/in/alimjan-ablimit"}
            target="_blank"
          >
            Linkedin
          </Link>
        </Button>
      </div>
    </div>
  );
}
