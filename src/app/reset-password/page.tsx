"use client";
import { useState, useEffect } from "react";
import PasswordInput from "@/components/inputs/PasswordInput";
import Header from "@/components/layouts/Header";
import Button from "@/components/buttons/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/graphql/mutations";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const schema = yup.object({
  password: yup.string().required("Please enter your password."),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function ResetPassword() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<any>();

  const [resetPassword, result] = useMutation(RESET_PASSWORD, {
    onError: (error) => {
      console.log(error.message);
      setError(error.message);
      toast.error(error.message);
    },
    onCompleted: (data) => {
      console.log("sherif here", data);
       toast.success(data.resetPassword.message);
       reset();
      window.location.href = "/login";
    },
  });

  const searchParams = useSearchParams();

  const token = searchParams?.get("token");
  // useEffect(() => {
  //   if (result.data) {
  //     console.log(result.data);
  //     toast.success(result.data.resetPassword.message);
  //     reset();
  //   }
  // }, [result.data, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    resetPassword({
      variables: {
        input: {
          password: data.password,
          token,
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto px-2 w-[90%] md:w-[400px] xl:w-[365px] mt-20 xl:mt-28 flex flex-col gap-y-2 mb-6">
        <h1 className="text-[#060809] font-medium text-[28px] leading-[39.2px]">
          Create new password
        </h1>
        <div className="text-[#555555] pb-[19px] font-normal">
          We’ll send you a link to recover your password
        </div>
        <div className="">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`flex flex-col gap-y-2`}>
                <PasswordInput
                  name="password"
                  label="New Password"
                  placeholder="**********"
                  register={register}
                  errorMessage={errors?.password?.message}
                />
                <PasswordInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="**********"
                  register={register}
                  errorMessage={errors?.confirmPassword?.message}
                />
              </div>
              <div className="mt-4">
                <Button
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Create new password
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </div>
      <ToastContainer />
    </main>
  );
}
