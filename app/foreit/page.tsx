export default function videoInfo() {
  return (
    <div className="flex-1 space-x-3 flex flex-row">
      <div className="w-full h-full border-4 md:border-8  border-black flex items-center justify-center">
        <audio controls>
          <source src="https://s3.is-ali.tech/EIT%20voice%20memo.m4a" type="audio/mp4" />
        </audio>
        
      </div>
      <div className="w-full h-full border-4 md:border-8  border-black">
        <iframe
          className="border w-full h-full  p-2 "
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FzmKRCSDb2N0O7mttOOP7My%2FSalad-Say---english-learning-App---EIT-project%3Ftype%3Ddesign%26node-id%3D25-1011%26t%3DgAhxmILD0MufFEaS-1%26scaling%3Dscale-down%26page-id%3D0%253A1%26starting-point-node-id%3D25%253A1011%26mode%3Ddesign"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
