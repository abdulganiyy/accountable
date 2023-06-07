import Image from "next/image";
import React from "react";
import group1 from "../assets/Frame 427319733group-1.png";
import group2 from "../assets/Frame 427319734group2.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

//check if you have 5xl for the hero main text

function Hero() {
  const router = useRouter();
  return (
    <section className="grid grid-cols-2 mx-auto">
      <div className="col-span-2 lg:col-span-1 px-[10%] py-16 lg:py-24 md:px-[13%] xl:px-[10%] text-[#121217] ">
        <h1 className="text-4xl md:text-5xl xl:text-[4.5vw] font-bold ">
          Understand your business financial & know peace
        </h1>
        <p className="text-[#6B7280] text-lg xl:text-[1.25vw] xl:leading-[160%] font-normal mt-[20px] xl:mt-[1.38vw]">
          Accountable supports business owners like yourself in knowing the
          health of your finances & the state of your business, by offering
          dedicated experts and user-friendly financial software. Get the
          required expertise while you focus on growing your business
        </p>
        <div className="mt-[48px] xl:mt-[3.33vw] flex items-center">
          <button
            onClick={() => {
              router.push("/signup");
            }}
            className="block bg-[#03045E] px-5 py-2 xl:px-0 xl:py-0 xl:w-[12vw] xl:h-[3.9vw] text-[#FFFFFF] rounded-lg xl:text-[1.1vw]"
          >
            Get Started
          </button>
          <button className="outline outline-1 outline-[#03045E] px-5 py-2 xl:px-0 xl:py-0 xl:w-[12vw] xl:h-[3.8vw] text-[#03045E] rounded-lg ml-[3%] xl:text-[1.1vw]">
            Book a call
          </button>
        </div>
        <div className="mt-[64px] xl:mt-[4.44vw] flex md:items-center md:justify-between lg:items-start lg:justify-between md:w-[80%]">
          <div>
            <h3 className="text-[#121217] font-bold text-4xl xl:text-[2.77vw]">
              100+
            </h3>
            <p className="text-[#6B7280] text-sm xl:text-[0.97vw] mt-5 xl:mt-[1.38vw] ">
              OVER 100+ <span className="text-[#ED715C]">Reviews</span>
            </p>
          </div>
          <div>
            <h3 className="text-[#121217] font-bold text-4xl xl:text-[2.77vw]">
              10+
            </h3>
            <p className="text-[#6B7280] text-sm xl:text-[0.97vw] mt-5 xl:mt-[1.38vw]">
              Years of experience
            </p>
          </div>
          <div>
            <h3 className="text-[#121217] font-bold text-4xl xl:text-[2.77vw]">
              25+
            </h3>
            <p className="text-[#6B7280] text-sm xl:text-[0.97vw] mt-5 xl:mt-[1.38vw]">
              Total referrals
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1 flex items-center justify-center py-16 ">
        <Image
          src={"/Frame 427319733group-1.png"}
          alt="rectangle"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="w-[40%] xl:w-[20vw] xl:h-[44.3vw]"
        />
        <Image
          src={"/Frame 427319734group2.png"}
          alt="rectangle"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="w-[35%] xl:w-[14.4vw] xl:h-[30.5vw]"
        />
      </div>
    </section>
  );
}

export default Hero;
