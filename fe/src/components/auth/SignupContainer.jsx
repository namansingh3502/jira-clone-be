import Logo from "~/src/components/common/Logo";
import SignupForm from "~/src/components/auth/SignupForm";

export default function SignupContainer(props) {
  return (
    <div className={"w-full flex-col flex justify-center items-center py-4"}>
      <Logo />
      <div className={"font-semibold"}>
        <h1>Sign up to continue</h1>
      </div>
      <hr
        className={"w-4/5 h-[1px] mx-auto bg-gray-400 my-2 border-0 rounded"}
      />
      <SignupForm switchContainer={props.switchContainer} />
    </div>
  );
}
