import { Badge } from "@/components/ui/badge";

const mainCoures = [
  "Fundamentals of Programming",
  "Lectures on Programming",
  "Computer Aided Industrial Design",
  "User Experienceand Product Innovation Design",
  "Physical Component for Innovation Design",
  "Python Programming",
  "Design Psychology",
  "Business Data Analysis",
  "Information Product Design",
  "Design Innovation Practice",
  "Information and Interaction Design Technology",
  "Service Innovation Design",
];

const Achievements = [
  "First Prize in Zhejiang University ”Dandelion” Entrepreneurship Competition",
  "Silver Award in the 4th ”Internet+” Entrepreneurship Competition in Zhejiang Province",
  "Silver Award in the 11th ”Chuangqingchun” Competition in Zhejiang Province",
];

export default function EduBlock() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">Zhejiang University</h1>
      <div className=" flex w-fit gap-2 flex-wrap">
        <Badge className="w-fit" variant="outline">
          Sep 2016 - Jul 2021
        </Badge>
        <Badge className="w-fit" variant="outline">
          COLLEGE OF COMPUTER SCIENCE AND TECHNOLOGY
        </Badge>
        <Badge className="w-fit" variant="outline">
          BEng in Industrial Design
        </Badge>
      </div>

      <div className="md:grid grid-cols-2  gap-4 space-y-2 md:space-y-0 ">
        <div className="flex-1 space-y-2">
          <p>Main courses</p>
          <div className="flex flex-wrap gap-2">
            {mainCoures.map((item) => (
              <Badge key={item} variant="outline">
                {" "}
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <p>Achievements</p>
          <div className="flex flex-wrap gap-2">
            {Achievements.map((item) => (
              <Badge key={item} variant="outline">
                {" "}
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
