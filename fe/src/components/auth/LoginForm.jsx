import { useForm } from "react-hook-form";
import { Input } from "../FormInput";

export default function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const FormFields = [
    {
      id: "email",
      type: "email",
      fieldID: "email",
      label: "Email",
    },
    {
      id: "password",
      type: "password",
      fieldID: "password",
      label: "Username",
    },
  ];

  return (
    <form
      className={"w-full flex flex-col justify-center items-center px-2 py-4"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={"w-4/5 flex-col justify-center space-y-6"}>
        {FormFields.map((field) => (
          <Input
            key={field.id}
            register={register}
            id={field.id}
            type={field.type}
            fieldID={field.fieldID}
            label={field.label}
          />
        ))}
      </div>
      <div className={"w-4/5 flex my-4 space-x-6"}>
        <button
          type={"submit"}
          className={
            "px-8 py-1 rounded-xl bg-orange-500 hover:bg-orange-600 hover:scale-105 "
          }
        >
          Login
        </button>
        <a
          className={
            "text-slate-400 font-normal underline hover:text-orange-500 py-1 text-sm"
          }
          href={"#"}
          onClick={(event) => {
            event.preventDefault();
            props.switchContainer();
          }}
        >
          I'am New
        </a>
      </div>
    </form>
  );
}
