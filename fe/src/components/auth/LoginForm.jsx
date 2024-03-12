import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "~/src/components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { LoginAPI } from "~/src/api/LoginAPI";
import {
  setLocalstorage,
  clearLocalstorage,
} from "~/src/utils/localstorageMethods";

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const mutation = useMutation({
    mutationFn: LoginAPI,
    onError: (error) => {
      clearLocalstorage();
      setValidationError(error.response.data?.detail);
    },
    onSuccess: (data) => {
      setLocalstorage("access_token", data.data["access"], 60 * 60);
      setLocalstorage("refresh_token", data.data["refresh"], 60 * 60);
      navigate("/dashboard");
    },
  });

  const FormFields = [
    {
      id: "signinEmail",
      type: "email",
      fieldID: "email",
      label: "Email",
      validators: { required: true },
      errors: errors.email,
    },
    {
      id: "signinPassword",
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
      <div className={"w-4/5 flex-col justify-center space-y-2"}>
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
      <div className={"w-4/5 flex text-xs text-red-500"}>
        <p className={"mx-2"}>{validationError}</p>
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
