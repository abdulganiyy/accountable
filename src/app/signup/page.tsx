"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import TextInput from "@/components/inputs/TextInput";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import RadioInput from "@/components/inputs/RadioInput";
import Header from "@/components/layouts/Header";
import Button from "@/components/buttons/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/mutations";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const schema = yup.object({
  type: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  companyName: yup.string().when("type", {
    is: (val: any) => val !== "individual",
    then: (schema) => schema.required(),
    // otherwise: (schema) => schema.min(0),
  }),
  website: yup
    .string()
    .matches(
      /(((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?)?$/,
      "Enter correct url!"
    ),
  password: yup
    .string()
    .required()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[^\w]/, "Password requires a symbol"),
});

export default function Home() {
  const [formStep, setFormStep] = useState(1);
  const searchParams = useSearchParams();

  const code = searchParams?.get("code");
  // console.log(code);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      type: "MICRO_ENTERPRISE",
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      website: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [error, setError] = useState<any>();

  const [signUp, result] = useMutation(REGISTER, {
    onError: (error) => {
      console.log(error.message);
      setError(error.message);
      toast.error(error.message, { pauseOnHover: false });
    },
  });

  const router = useRouter();

  useEffect(() => {
    console.log(result.data?.register?.data?.email);

    if (result.data?.register?.code) {
      // reset();
      toast.error(result.data?.register?.message, { pauseOnHover: false });
    } else if (result.data?.register?.data?.email) {
      reset();
      router.push(`/passwordlink?email=${result.data?.register?.data?.email}`);
    }
  }, [result.data, router, reset]);

  const onSubmit = async (data: any) => {
    // console.log(code || undefined);
    signUp({
      variables: {
        input: {
          ...data,
          code: code ? code : undefined,
          website: data?.website ? data?.website : undefined,
          // type: data.type === "individual" ? "INDIVIDUAL" : "COMPANY",
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto px-2 w-[90%] md:w-[500px] lg:w-[405px] mt-12 xl:mt-16 flex flex-col gap-y-2 mb-6">
        <h1 className="text-[#060809] md:w-[345px] font-medium text-[28px] leading-[39.2px]">
          Complete Account Setup in 2 Minutes
        </h1>
        <div className="text-[#555555] pb-[19px] font-normal">
          Setup your account and get started in{" "}
          <span className="font-semibold text-[#01232C]">2</span> minutes
        </div>
        <div className="">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {formStep === 0 && (
                <>
                  <h3 className=" border-t-[2px] pt-4 border-[#EAEDEF] mb-4 text-[#060809] font-medium text-[18px] leading-[27.9px]">
                    What best describes the type of account you want to set up?
                  </h3>
                  <div
                    className={`${
                      formStep === 0 ? "flex flex-col gap-y-3" : "hidden"
                    }`}
                  >
                    <RadioInput
                      name="type"
                      id="individual"
                      label="Individual "
                      value="INDIVIDUAL"
                      register={register}
                    />
                    <RadioInput
                      name="type"
                      id="micro"
                      label="Micro Enterprise "
                      smallLabel="(less than N5M in revenue)"
                      value="MICRO_ENTERPRISE"
                      register={register}
                    />
                    <RadioInput
                      name="type"
                      id="small"
                      label="Small Scale Enterprise "
                      smallLabel="(N5M to N49.9M in revenue)"
                      value="SMALL_SCALE_ENTERPRISE"
                      register={register}
                    />
                    <RadioInput
                      name="type"
                      id="medium"
                      label="Medium Scale Enterprise "
                      smallLabel="(N50M to N500M in revenue)"
                      value="MEDIUM_SCALE_ENTERPRISE"
                      register={register}
                    />
                    <RadioInput
                      name="type"
                      id="large"
                      label="Large Scale Enterprise "
                      smallLabel="(More than N500M in revenue)"
                      value="LARGE_SCALE_ENTERPRISE"
                      register={register}
                    />
                  </div>
                </>
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
                      errorMessage={errors?.firstName?.message}
                    />
                    <TextInput
                      label="Last name"
                      placeholder="e.g David"
                      register={register}
                      name="lastName"
                      errorMessage={errors?.lastName?.message}
                    />
                  </div>
                  <EmailInput
                    label="Email address"
                    name="email"
                    placeholder="e.g yourname@gmail.com"
                    register={register}
                    errorMessage={errors?.email?.message}
                  />
                  {getValues("type") !== "individual" && (
                    <div className="grid grid-cols-2 gap-2">
                      <TextInput
                        label="Company name"
                        placeholder="e.g Accountable HQ"
                        register={register}
                        name="companyName"
                        errorMessage={errors?.companyName?.message}
                      />
                      <TextInput
                        label="Company URL"
                        placeholder="www.accountable.com"
                        register={register}
                        name="website"
                        errorMessage={errors?.website?.message}
                      />
                    </div>
                  )}
                  <PasswordInput
                    name="password"
                    label="Password"
                    placeholder="**********"
                    register={register}
                    errorMessage={errors?.password?.message}
                  />
                </div>
              )}
              <div className="mt-4">
                {formStep === 0 ? (
                  <Button
                    type="button"
                    disabled={!getValues("type")}
                    onClick={() => setFormStep(1)}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    disabled={!isValid || isSubmitting || result.loading}
                    isLoading={isSubmitting || result.loading}
                    type="submit"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </form>
            <div className="mt-4 text-[#555555] font-normal text-[12px] leading-[18px]">
              By clicking “Continue” you agree to the
              <Link href="/" className="underline mx-1">
                Terms of Service
              </Link>
              and acknowledge the{" "}
              <Link href="/" className="underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <pre className="hidden">{JSON.stringify(watch(), null, 2)}</pre>
      </div>
      <ToastContainer />
    </main>
  );
}
