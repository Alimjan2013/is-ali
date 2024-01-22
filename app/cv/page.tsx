import CVBlock from "./cvContent";
import EduBlock from "./educationBlock";

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
    </div>
  );
}
