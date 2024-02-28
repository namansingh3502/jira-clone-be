export const Input = (props) => {
  return (
    <div className={"w-full"}>
      <label className={"w-full relative group"}>
        <input
          id={props.id}
          type={props.type}
          className="peer h-10 w-full border-2 p-2 block appearance-none focus:outline-none focus:ring-0 rounded-md focus:border-blue-500"
          placeholder={""}
          {...props.register(props.fieldID)}
        />
        <span
          className={
            "absolute text-sm duration-200 transform -translate-y-4 scale-90 top-2 left-2 px-1 z-10 origin-[0] bg-white text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:text-blue-500 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rounded-xl"
          }
        >
          {props.label}
        </span>
      </label>
    </div>
  );
};
