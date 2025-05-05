import React from "react";
import TimerDemo from "../components/TimerDemo";
import AnimatedText from "../components/AnimatedText";

const page = () => {
  return (
    <div>
      {/* <TimerDemo/> */}
      <main className="min-h-screen p-24">
        <AnimatedText />
      </main>{" "}
    </div>
  );
};

export default page;
