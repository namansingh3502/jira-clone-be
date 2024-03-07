import { useForm } from "react-hook-form";
import { Input } from "~/src/components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { LoginAPI } from "~/src/api/loginAPI";

export default function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: LoginAPI,
    onError: (error) => {
      console.log("error: ", error);
    },
    onSuccess: (data) => {
      console.log("success: ", data);
    },
    onSettled: (data) => {},
  });

  const FormFields = [
    {
      id: "login_email",
      type: "email",
      fieldID: "email",
      label: "Email",
    },
    {
      id: "login_password",
      type: "password",
      fieldID: "password",
      label: "Password",
    },
  ];

  return (
    <form
      className={"w-full flex flex-col justify-center items-center px-2 py-4"}
      onSubmit={handleSubmit(mutation.mutate)}
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
          I am New
        </a>
      </div>
    </form>
  );
}
