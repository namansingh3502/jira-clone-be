import Logo from "../common/Logo";

export default function LoginContainer(props) {
  return (
    <div className={"w-full flex-col flex justify-center items-center"}>
      <Logo />
      <div className={"font-semibold my-2"}>
        <h1>Log in to continue</h1>
      </div>
      <hr
        className={"w-2/3 h-[1px] mx-auto bg-gray-400 my-2 border-0 rounded"}
      />
      <form
        className={"w-full py-4 px-10 space-y-6"}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={"my-4 space-y-6"}>
          <div className={"h-10 border border-black"}>Username</div>
          <div className={"h-10 border border-black"}>Password</div>
        </div>
        <div className={"w-full flex space-x-6"}>
          <button
            className={
              "rounded-2xl bg-red-500 px-6 text-white hover:scale-105 transition duration-100"
            }
          >
            Login
          </button>
          <a
            className={"underline "}
            href={"#"}
            onClick={(e) => {
              e.preventDefault();
              props.switchContainer();
            }}
          >
            I'm New
          </a>
        </div>
      </form>
    </div>
  );
}
