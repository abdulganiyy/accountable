"use client";
import { useState, useEffect } from "react";
import Select from "@/components/inputs/Select";
import SelectCountry from "@/components/inputs/SelectCountry";
import SelectCurrency from "@/components/inputs/SelectCurrency";
import PhoneInput from "@/components/inputs/PhoneInput";
import Header from "@/components/layouts/Header";
import Button from "@/components/buttons/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { phoneRegExp } from "@/utils";
import { useMutation } from "@apollo/client";
import { ONBOARD, VERIFY_PHONE } from "@/graphql/mutations";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

// const schema = yup.object({
//   revenue: yup.string().required(),
//   country: yup.string().required(),
//   currency: yup.string().required(),
//   phone: yup.string()
//   .required("required")
//   .matches(phoneRegExp, "Phone number is not valid"),
// });

const schema = yup.object({
  industry: yup.string(),
  size: yup.string(),
  revenue: yup.string().required("revenue required"),
  country: yup.string().required(),
  currency: yup.string().required(),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid"),
});

export default function CompleteOnboarding() {
  const searchParams = useSearchParams();

  const type = searchParams?.get("type");
  const {
    watch,
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<any>();

  const [onboard, result] = useMutation(ONBOARD);
  // const [verifyPhone, res] = useMutation(VERIFY_PHONE);

  const router = useRouter();

  useEffect(() => {
    console.log(result.data);

    if (result.data?.onboard?.data) {
      router.push(`/dashboard`);
    } else if (result.data?.onboard?.code) {
      toast.error(result.data?.onboard?.message);
    }
  }, [result.data, router]);

  // const [verifyPhone, result] = useMutation(VERIFY_PHONE);

  // const router = useRouter();

  // useEffect(() => {
  //   if (result.data?.requestPhoneVerification?.code) {
  //     console.log(result.data?.requestPhoneVerification);
  //     toast.error(result.data?.requestPhoneVerification?.message);
  //   } else if (result.data?.requestPhoneVerification?.message) {
  //     toast("OTP Code Sent");
  //     router.push(`/otp?details=${JSON.stringify(getValues())}`);
  //   }
  // }, [result.data, router, getValues]);

  const onSubmit = async (data: any) => {
    console.log(data);
    // verifyPhone({
    //   variables: {
    //     input: {
    //       phone: `+${data.phone}`,
    //     },
    //   },
    // });
    onboard({
      variables: {
        input: {
          monthlyRecurringRevenue: data.revenue,
          operationCountry: data.country,
          reportingCurrency: data.currency,
          companySize: data.size,
          industry: data.industry,
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto px-2 w-[365px] mt-[32px] flex flex-col gap-y-2 mb-6">
        <h1 className="text-[#060809] font-medium text-[28px] leading-[39.2px]">
          Just one more step...
        </h1>
        <div className="text-[#555555] pb-[19px] font-normal">
          Tell us a bit more about your business
        </div>
        <div className="">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`flex flex-col gap-y-2`}>
                {type !== "individual" && (
                  <>
                    <Select
                      name="industry"
                      label="Industry"
                      placeholder="Industry Type"
                      register={register}
                      setValue={setValue}
                      options={[
                        {
                          key: "Finance",
                          value: "finance",
                        },
                        {
                          key: "Tax",
                          value: "tax",
                        },
                        {
                          key: "Manufacturing",
                          value: "manufacturing",
                        },
                        {
                          key: "Production",
                          value: "production",
                        },
                        {
                          key: "Technology",
                          value: "technology",
                        },
                      ]}
                      errorMessage={error?.industry?.message}
                      trigger={trigger}
                    />
                    <Select
                      name="size"
                      label="Company size"
                      placeholder="Size"
                      register={register}
                      setValue={setValue}
                      options={[
                        {
                          key: "Less than 50",
                          value: "less than 50",
                        },
                        {
                          key: "Between 200 and 300",
                          value: "Between 400 and 500",
                        },
                        {
                          key: "Between 300 and 400",
                          value: "between 300 and 400",
                        },
                        {
                          key: "Between 400 and 500",
                          value: "between 400 and 500",
                        },
                        {
                          key: "More than 500",
                          value: "more than 500",
                        },
                      ]}
                      errorMessage={error?.size?.message}
                    />
                  </>
                )}
                <Select
                  name="revenue"
                  label="Monthly revenue"
                  placeholder="Your monthly revenue"
                  register={register}
                  setValue={setValue}
                  options={[
                    {
                      key: "$50,000 - $100,000",
                      value: "$50,000 - $100,000",
                    },
                    {
                      key: "$100,000 - $200,000",
                      value: "$100,000 - $200,000",
                    },
                    {
                      key: "$200,000 - $250,000",
                      value: "$200,000 - $250,000",
                    },
                  ]}
                  errorMessage={error?.revenue?.message}
                />
                <div className="grid grid-cols-2 gap-2">
                  <SelectCountry
                    name="country"
                    label="Operation country"
                    register={register}
                    setValue={setValue}
                    errorMessage={error?.country?.message}
                  />
                  <SelectCurrency
                    name="currency"
                    label="Reporting currency"
                    register={register}
                    setValue={setValue}
                    errorMessage={error?.currency?.message}
                  />
                </div>
                <PhoneInput
                  name="phone"
                  label="Phone number"
                  placeholder="8123456789"
                  register={register}
                  setValue={setValue}
                  trigger={trigger}
                  error={errors.phone}
                />
              </div>
              <div className="mt-4 z-100">
                <Button
                  disabled={!isValid || isSubmitting || result.loading}
                  isLoading={isSubmitting || result.loading}
                  type="submit"
                >
                  Continue
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
