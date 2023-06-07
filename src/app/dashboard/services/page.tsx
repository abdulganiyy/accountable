"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { twMerge } from "tailwind-merge";
import { Portal } from "@/components/Portal";
import { ToastContainer, toast } from "react-toastify";
import ServicePicker from "@/components/ServicePicker";
import {
  CaretDown,
  PokerChip,
  Book,
  Percent,
  Calculator,
  BookOpen,
  Money,
  ChartLineUp,
  Notepad,
  Info,
  Bank,
  Scales,
  Rocket,
} from "@phosphor-icons/react";
import ServiceCard from "@/components/ServiceCard";
import { GET_SERVICES, GET_SUBSCRIPTIONS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { BeatLoader } from "react-spinners";
import PaidServiceCard from "@/components/PaidServiceCard";

const Page = () => {
  const [chooseService, setChooseService] = useState<any>(false);
  const [services, setServices] = useState<any>([]);
  const [subscriptions, setSubscriptions] = useState<any>([]);

  const res = useQuery(GET_SERVICES, {
    variables: {
      input: { limit: 10 },
    },
  });

  const { data, loading } = useQuery(GET_SUBSCRIPTIONS, {
    variables: {
      input: { limit: 10 },
    },
  });

  useEffect(() => {
    // console.log(data);

    if (data?.getSuscriptions?.code) {
      //
      toast.error(data?.getSuscriptions?.message);
    } else if (data?.getSuscriptions?.data) {
      console.log(data?.getSuscriptions?.data);

      setSubscriptions(data?.getSuscriptions?.data);
    }
  }, [data]);

  // const router = useRouter();

  useEffect(() => {
    if (res.data?.getServices?.code) {
      //
      toast.error(res.data?.getServices?.message);
    } else if (res.data?.getServices?.data) {
      console.log(res.data?.getServices?.data);

      setServices(res.data?.getServices?.data);
    }
  }, [res.data]);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-extrabold text-[28px] leading-[42px] text-[#060809]">
            Services
          </h3>
          <p className="text-[#414141] text-[18px] leading-[28px]">
            Check out the list of services we provide tailored to meet your
            specific needs.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center">Paid Services</div>
        <div className="mt-3 grid grid-cols-3 gap-6">
          {subscriptions?.length > 0
            ? subscriptions.map((subscription: any, i: number) => {
                return <PaidServiceCard key={i} item={{ ...subscription }} />;
              })
            : null}
          {/* <PaidServiceCard item={{}} />
          <PaidServiceCard item={{ status: "In progress" }} />
          <PaidServiceCard item={{ status: "active" }} /> */}
        </div>
      </div>
      <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl mt-6">
        <div className="h-[68px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
          Services you can purchase
          {/* <button
            onClick={() => {
              setChooseService(true);
            }}
            className="bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px]"
          >
            Purchase a service
          </button> */}
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          {services.length > 0
            ? services.map((item: any, i: number) => {
                const {
                  name,
                  price,
                  description,
                  subscription,
                  frequency,
                  currency,
                } = item;

                return (
                  <ServiceCard
                    key={i}
                    icon={<ChartLineUp size={20} />}
                    name={name}
                    price={price}
                    description={description}
                    subscription={subscription}
                    frequency={frequency}
                    currency={currency}
                    setChooseService={setChooseService}
                  />
                );
              })
            : null}
          {/* <ServiceCard
            icon={<ChartLineUp size={20} />}
            name="Process Improvement"
            price="₦26,000.00 / month"
          /> */}
        </div>
      </div>
      {chooseService && (
        <ServicePicker
          onClose={() => {
            setChooseService(false);
          }}
          services={services.filter(
            (service: any) => service?.subscription === true
          )}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;

// [
//   {
//     name: "Monthly Bookkeeping",
//     price: "26500",
//     subscription: true,
//     description: "",
//     currency: "₦",
//     frequency: "MONTHLY",
//   },
//   {
//     name: "Tax Filling & Advisory",
//     price: "26500",
//     subscription: true,
//     description: "",
//     currency: "₦",
//     frequency: "MONTHLY",
//   },
//   {
//     name: "Catchup Accounting",
//     price: "26500",
//     subscription: false,
//     description: "",
//     currency: "₦",
//     frequency: "",
//   },
//   {
//     name: "Monthly Bookkeeping",
//     price: "26500",
//     subscription: true,
//     description: "",
//     currency: "₦",
//     frequency: "MONTHLY",
//   },
//   {
//     name: "Tax Filling & Advisory",
//     price: "26500",
//     subscription: true,
//     description: "",
//     currency: "₦",
//     frequency: "MONTHLY",
//   },
//   {
//     name: "Catchup Accounting",
//     price: "26500",
//     subscription: false,
//     description: "",
//     currency: "₦",
//     frequency: "",
//   },
// ]
