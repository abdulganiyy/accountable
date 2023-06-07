import React, { useState } from "react";
import { useRouter } from "next/navigation";

const accordionBenefits = [
  {
    title: "One-on-one expert support",
    description:
      "Accountable goes beyond software by providing access to dedicated Account Manager. Businesses can benefit from professional advice and assistance, ensuring that they make informed financial decisions.",
  },
  {
    title: "Powerful & User-Friendly Financial Reporting Interface",
    description:
      "Accountable visualises your financial statements in powerful visual formats that makes financial insights accessible to users with varying levels of financial expertise",
  },
  {
    title: "Cost Savings and Efficiency",
    description:
      "By automating financial processes and providing expert support, Accountable contributes to cost savings for businesses and individuals. The platform helps in reducing the risk of financial errors,and optimises overall financial efficiency.",
  },
  {
    title: "360 Financial Management Services",
    description:
      "Accountable simplifies financial management by offering a comprehensive suite of tools. The platform streamlines these processes, saving users time and effort while ensuring accurate and organized financial records.",
  },
];

const benefits = [
  {
    title: "Connect your bank accounts",
    description:
      "This reduces manual data entry, minimises errors, and ensures that financial data is always up-to-date",
  },
  {
    title: "Upload your bank statements",
    description:
      "Need historical bookkeeping? Upload those files and we’ll ensure  to get you caught up to your finances",
  },
  {
    title: "Meet your Account Manager",
    description:
      "Accountable matches you with qualified financial experts for personalised consultations & guidance",
  },
  {
    title: "Schedule Recurring Meetings",
    description:
      "From discovery to analysis, and insights set recurring meetings with your account manager as required",
  },
  {
    title: "Customizable & Tailored Services",
    description:
      "Understand your business position with your account manager, pick & choose the required services conveniently.",
  },
  {
    title: "Messages & File Sharing",
    description:
      "Accountable matches you with qualified financial experts for personalised consultations & guidance",
  },
];

function Benefits() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const router = useRouter();

  return (
    <>
      <section className="px-8 py-12 lg:px-16 lg:py-16 xl:px-[8%] xl:py-[8vw]">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-[3.8vw] font-semibold text-[#121217]">
            Benefits of joining Accountable
          </h2>
          <p className="mt-2 lg:mt-3 xl:mt-[0.83vw] font-[400] text-[#6B7280] text-sm md:text-base xl:text-[1.1vw]">
            We genuinely love and care deeply our clients and they love us as
            well.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-24 xl:gap-[7.2vw] mt-8 md:mt-12 lg:mt-16 xl:mt-[4.4vw]">
          <div className="col-span-2 lg:col-span-1">
            {accordionBenefits.map(({ title, description }, index) => (
              <div
                key={index}
                className="bg-[#E1E6EF33] py-8 xl:py-[2.36vw] px-[10%]"
              >
                <h6
                  className="font-semibold text-lg md:text-2xl xl:text-[1.66vw] text-[#03045E] flex items-start gap-5 cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>0{index + 1}</span>
                  <span>{title}</span>
                </h6>
                {expandedIndex === index && (
                  <p className="text-[#6C6C89] font-[400] text-base md:text-lg xl:text-[1.25vw] xl:leading-[160%] mt-3 lg:mt-5 xl:mt-[1.38vw]">
                    {description}
                  </p>
                )}
              </div>
            ))}

            <div className="mt-12 xl:mt-[3.33vw] ">
              <button
                onClick={() => {
                  router.push("/signup");
                }}
                className=" px-5 py-3 xl:px-0 xl:py-0 xl:w-[12vw] xl:h-[3.88vw] xl:text-[1.1vw] outline outline-1 outline-[#03045E] bg-[#03045E] text-[#FFFFFF] rounded-xl"
              >
                Get started
              </button>
              <button className="outline outline-1 outline-[#03045E] xl:text-[1.1vw] px-5 py-3 xl:px-0 xl:py-0 xl:w-[12vw] xl:h-[3.88vw] text-[#03045E] rounded-lg ml-[3%]">
                Book a call
              </button>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 bg-[#ECF7FF] rounded-xl min-h-[300px] lg:min-h-0 lg:h-full"></div>
        </div>
      </section>
      <div className="px-8 lg:px-16 xl:px-[8%]">{/* <hr /> */}</div>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-[3.8vw] font-semibold text-[#121217]">
          Here’s how we serve you ...
        </h2>
        <p className="mt-2 lg:mt-3 xl:mt-[0.83vw] font-[400] text-[#6B7280] text-sm md:text-base xl:text-[1.1vw]">
          Experience our seamless & quality services.
        </p>
      </div>
      <section className="grid grid-cols-6 px-8 py-12 lg:px-16 lg:py-16 xl:px-[4%] xl:py-[4vw] gap-3 ">
        {benefits.map(({ title, description }, index) => {
          return (
            <div
              key={index}
              className="p-10 xl:p-[3.1vw] col-span-6 md:col-span-3 xl:col-span-2 "
            >
              <h6 className="text-[#ED715C] text-sm xl:text-[0.97vw]">
                0{index + 1}.
              </h6>
              <h4 className="mt-6 mb-2 xl:mt-[1.66vw] text-xl md:text-2xl xl:text-[2.5vw] xl:leading-[140%] ">
                {title}
              </h4>
              <p className="text-[#6C6C89] text-base md:text-lg xl:text-[1.25vw] leading-[166.66%] ">
                {description}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Benefits;
