"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POST, GET_USERS } from "@/graphql/queries";
import Image from "next/image";
import TextInput from "@/components/inputs/TextInput";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import RadioInput from "@/components/inputs/RadioInput";
import Header from "@/components/layouts/Header";
import Button from "@/components/buttons/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    type: yup.string().required(),
  })
  .required();

export default function Home() {
  const [formStep, setFormStep] = useState(0);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto w-[365px] mt-[32px] flex flex-col gap-y-2 mb-6">
        <h1 className="text-[#060809] font-medium text-[28px] leading-[39.2px]">
          Complete Account Setup in 2 Minutes
        </h1>
        <div className="border-b-[2px] border-[#EAEDEF] text-[#555555] pb-[19px] font-normal">
          Setup your account and get started in{" "}
          <span className="font-semibold text-[#01232C]">2</span> minutes
        </div>
        <div className="mt-[32px]">
          <h3 className="mb-4 text-[#060809] font-medium text-[18px] leading-[27.9px]">
            What best describes the type of account you want to set up?
          </h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {formStep >= 0 && (
                <div className={`${formStep === 0 ? "block" : "hidden"}`}>
                  <RadioInput
                    name="type"
                    id="individual"
                    label="Individual "
                    value="individual"
                    register={register}
                  />
                  <RadioInput
                    name="type"
                    id="micro"
                    label="Micro Enterprise (less than N5M in revenue)"
                    value="micro"
                    register={register}
                  />
                  <RadioInput
                    name="type"
                    id="small"
                    label="Small Scale Enterprise (N5M to N49.9M in revenue)"
                    value="small"
                    register={register}
                  />
                  <RadioInput
                    name="type"
                    id="medium"
                    label="Medium Scale Enterprise (N50M to N500M in revenue)"
                    value="medium"
                    register={register}
                  />
                  <RadioInput
                    name="type"
                    id="large"
                    label="Large Scale Enterprise (More than N500M in revenue)"
                    value="large"
                    register={register}
                  />
                </div>
              )}
              {formStep >= 1 && (
                <div
                  className={`${
                    formStep === 1 ? "flex flex-col gap-y-2" : "hidden"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <TextInput
                      label="First name"
                      placeholder="e.g David"
                      register={register}
                      name="firstName"
                    />
                    <TextInput
                      label="Last name"
                      placeholder="e.g David"
                      register={register}
                      name="lastName"
                    />
                  </div>
                  <EmailInput
                    label="Email address"
                    name="email"
                    placeholder="e.g yourname@gmail.com"
                    register={register}
                  />
                  <PasswordInput
                    name="password"
                    label="Password"
                    placeholder="**********"
                    register={register}
                  />
                </div>
              )}
              <div className="mt-4">
                {formStep === 0 ? (
                  <Button
                    type="button"
                    disabled={!isValid}
                    onClick={() => setFormStep(1)}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </div>
        </div>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </main>
  );
}
