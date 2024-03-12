import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "~/src/components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { SignupAPI } from "~/src/api/SignupAPI";

import { setLocalstorage } from "~/src/utils/localstorageMethods";

export default function SignupForm(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const mutation = useMutation({
    mutationFn: SignupAPI,
    onError: (error) => {
      const inputs = error.response?.data["errors"];

      for (const [key, value] of Object.entries(inputs)) {
        setError(key, { type: "manual", message: value[0] });
      }
    },
    onSuccess: (data) => {
      setLocalstorage("fullName", data.data["full_name"], 3600 * 24 * 365);
      navigate("/account/activate");
    },
  });
  const FormFields = [
    {
      id: "firstName",
      type: "text",
      fieldID: "first_name",
      label: "First Name",
      validators: {
        required: true,
        maxLength: 50,
        pattern: /^[A-Za-z]+$/i,
      },
      errors: errors.first_name,
    },
    {
      id: "lastName",
      type: "text",
      fieldID: "last_name",
      label: "Last Name",
      validators: {
        required: true,
        maxLength: 50,
        pattern: /^[A-Za-z]+$/i,
      },
      errors: errors.last_name,
    },
    {
      id: "username",
      type: "text",
      fieldID: "username",
      label: "Username",
      validators: {
        required: true,
        maxLength: 50,
        pattern: /^[A-Za-z]+$/i,
      },
      errors: errors.username,
    },
    {
      id: "signupEmail",
      type: "email",
      fieldID: "email",
      label: "Email",
      validators: { required: true },
      errors: errors.email,
    },
    {
      id: "signupPassword",
      type: "password",
      fieldID: "password",
      label: "Password",
      validators: { required: true },
      errors: errors.password,
    },
  ];

  return (
    <form
      className={"w-full flex flex-col justify-center items-center px-2 py-4"}
      onSubmit={handleSubmit(mutation.mutate)}
    >
      <div className={"w-4/5 flex-col justify-center space-y-1"}>
        {FormFields.map((field) => (
          <Input
            key={field.id}
            register={register}
            id={field.id}
            type={field.type}
            fieldID={field.fieldID}
            label={field.label}
            validators={field.validators}
            error={field.errors}
          />
        ))}
      </div>
      <div className={"w-4/5 flex my-6 space-x-6"}>
        <button
          type={"submit"}
          className={
            "px-8 py-1 rounded-xl bg-orange-500 hover:bg-orange-600 hover:scale-105 "
          }
        >
          Signup
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
          I have an account
        </a>
      </div>
    </form>
  );
}
