import Logo from "~/src/components/common/Logo";
import LoginForm from "~/src/components/auth/LoginForm";

export default function LoginContainer(props) {
  return (
    <div className={"w-full flex-col flex justify-center items-center py-4"}>
      <Logo />
      <div className={"font-semibold my-2"}>
        <h1>Log in to continue</h1>
      </div>
      <hr
        className={"w-4/5 h-[1px] mx-auto bg-gray-400 my-2 border-0 rounded"}
      />
      <LoginForm switchContainer={props.switchContainer} />
    </div>
  );
}
