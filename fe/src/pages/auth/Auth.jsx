import { useState } from "react";
import LoginContainer from "~/src/components/auth/LoginContainer";
import illustration from "~/src/images/illustration.jpeg";
import SignupContainer from "~/src/components/auth/SignupContainer";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div
      className={
        "min-h-screen w-full bg-baseBg flex justify-center items-center"
      }
    >
      <div
        className={
          "min-h-[500px] h-96 w-4/5 max-w-[900px] relative flex justify-center"
        }
      >
        <div className={"absolute min-h-full w-1/2 z-50 flex left-0"}>
          <div
            className={
              "min-h-full w-full flex justify-center items-center shadow-xl"
            }
          >
            <img
              className={"h-full"}
              src={illustration}
              alt={"Product Illustration"}
            ></img>
          </div>
        </div>

        <div className={"flex py-3 h-full w-full"}>
          <div
            className={`w-1/2 bg-white ease-[cubic-bezier(1.000, -0.375, 0.285, 0.995)] shadow-xl py-4 px-8 ${showLogin ? "translate-x-full" : ""}`}
            style={{
              transition: "all 0.9s cubic-bezier(1.000, -0.375, 0.285, 0.995)",
            }}
          >
            <LoginContainer switchContainer={() => setShowLogin(!showLogin)} />
          </div>
          <div
            className={`w-1/2 bg-white ease-[cubic-bezier(1.000, -0.375, 0.285, 0.995)] shadow-xl ${showLogin ? "-translate-x-full" : ""}`}
            style={{
              transition: "all 0.9s cubic-bezier(1.000, -0.375, 0.285, 0.995)",
            }}
          >
            <SignupContainer switchContainer={() => setShowLogin(!showLogin)} />
          </div>
        </div>
      </div>
    </div>
  );
}
