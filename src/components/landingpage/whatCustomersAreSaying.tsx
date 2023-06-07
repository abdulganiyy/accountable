import React from "react";
import Image from "next/image";
// import profile from "../assets/Frame 427319507.svg";
// import joeboy from "../assets/Rectangle 34624100.png";
// import rehma from "../assets/Rectangle 34624100 (1).png";
// import orepekan from "../assets/6409e5f3f02f12214850844b_testimonial_one.png";
// import seun from "../assets/6409e5f30f1b4fa3d4e2bc91_testimonial_three.png";

function WhatCustomersAreSaying() {
  const actor = [
    {
      name: "Okikiola Osunkoya, CEO, Perception Technologies.",
      description:
        "Working with accountable has been nothing short of amazing really truly. Great attitude to work",
      reverse: false,
      image: "/Rectangle 34624100.png",
      subName: "Oluwaseun Orepekan, Managing Partner, STOT.",
      subDescription:
        "Accountable services thrives on the strength of adopting a customized approach that boost client business performance and financial operations",
      subImage: "/6409e5f3f02f12214850844b_testimonial_one.png",
    },
    {
      name: null,
      description: null,
      reverse: true,
      image: "/Rectangle 34624100 (1).png",
      subName: "Oluwaseun Adedokun CFO, The Bulb Africa",
      subDescription:
        "Accountable has been a game-changer for us. Their expert team has helped us streamline our financial processes and stay on top of compliance requirements. Thanks to their personalised support, we now have a clear understanding of our financial position",
      subImage: "/6409e5f30f1b4fa3d4e2bc91_testimonial_three.png",
    },
  ];
  return (
    <div className="px-4 py-2 md:px-12 md:py-10 lg:px-24 lg:py-18 xl:px-[7.7vw] xl:py-[8.3vw] flex flex-col bg-[#FFFDFA] ">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-[3.8vw] font-semibold text-[#121217] xl:leading-[142.85%]">
          What our customers are saying
        </h1>
        <p className="mt-2 lg:mt-3 xl:mt-[0.83vw] font-[400] text-[#6B7280] text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%]">
          We genuinely love and care deeply our clients and they love us as
          well.
        </p>
      </div>
      {actor.map((item, index) => (
        <div
          className={`mt-8 md:mt-12 lg:mt-16 xl:mt-[4.4vw] grid grid-cols-1 lg:grid-cols-10 gap-8 `}
          key={index}
        >
          <div
            className={`md:col-span-10 lg:col-span-4 ${
              item.reverse
                ? "order-2 bg-[#071A7E] hidden"
                : "order-1 bg-[#222832]"
            } p-4 md:p-6 lg:p-8 xl:p-[2.2vw]  rounded-[24px] md:rounded-[32px]`}
          >
            <p className="text-[#BDBEBE] text-xs md:text-sm xl:text-[0.8vw] xl:leading-[120%] font-medium">
              {item.name} - CREATIVE
            </p>
            <h3 className="text-[#FFFFFF] mt-2 md:mt-3 lg:mt-4 xl:mt-[1.1vw] text-2xl lg:text-3xl xl:text-[2.2vw] font-medium xl:leading-[120%]">
              {item.description}
            </h3>
            <div className="w-full overflow-hidden rounded-[24px] md:rounded-[32px] mt-4 md:mt-6 lg:mt-10 xl:mt-[2.7vw] border-1 border-solid ">
              <Image
                src={item.image}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full"
              />
            </div>
          </div>

          <div
            className={` ${
              item.reverse
                ? "order-1 md:col-span-10 mx-auto"
                : "order-2 md:col-span-10 lg:col-span-6"
            } p-4 md:p-6 lg:p-8 xl:p-[3.33vw] bg-[#EDEDED] rounded-[24px] md:rounded-[32px] `}
          >
            <p className="text-[#BDBEBE] text-xs md:text-sm xl:text-[0.8vw] xl:leading-[120%] font-medium">
              SOLE PROPRIETOR
            </p>
            <h3 className="text-[#121217] mt-2 md:mt-3 lg:mt-4 xl:mt-[2.2vw] text-xl md:text-2xl lg:text-3xl xl:text-[2.6vw] font-medium xl:leading-[120%]">
              ‘’{item.subDescription}‘’
            </h3>
            <div
              className={`flex ${
                item.reverse ? "flex-row-reverse" : ""
              } items-end justify-between mt-4 md:mt-8 xl:mt-[3vw] gap-6`}
            >
              <p className="text-md md:text-xl xl:text-[1.1vw] font-medium xl:leading-[120%]">
                {item.subName}
              </p>
              <Image
                src={item.subImage}
                alt="profile picture"
                width={0}
                height={0}
                sizes="100vw"
                // style={{ width: "100%", height: "auto" }}
                className="w-20 h-20 lg:w-28 lg:h-28 xl:h-[7.7vw] xl:w-[7.7vw] rounded-full border "
              />
            </div>
          </div>
        </div>
      ))}
      <div className="lg:w-[90%] mx-auto mt-8 md:mt-12 lg:mt-16 xl:mt-[4.4vw] grid grid-cols-4 gap-4 text-[#121217] text-center font-normal">
        <div className="col-span-2 lg:col-span-1 space-y-2">
          <h1 className="text-md md:text-xl xl:text-[2.3vw] font-semibold ">
            65yrs+
          </h1>
          <p className="text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%] text-[#6B7280]">
            COMBINED MGT. EXPERIENCE
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1 space-y-2">
          <h1 className="text-md md:text-xl xl:text-[2.3vw] font-semibold ">
            60+
          </h1>
          <p className="text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%] text-[#6B7280]">
            HAPPY CUSTOMERS
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1 space-y-2">
          <h1 className="text-md md:text-xl xl:text-[2.3vw] font-semibold ">
            4+
          </h1>
          <p className="text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%] text-[#6B7280]">
            COUNTRIES
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1 space-y-2">
          <h1 className="text-md md:text-xl xl:text-[2.3vw] font-semibold ">
            91.7%
          </h1>
          <p className="text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%] text-[#6B7280]">
            CUSTOMER RETENTION
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhatCustomersAreSaying;
