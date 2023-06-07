import React from "react";
import Image from "next/image";
import profilePicture from "../assets/Ellipse 983.svg";

const whoWeHaveBuiltFor = [
  {
    name: "For Small Business Owners",
    text: "Get an essential tool in an efficient financial management solutions.",
    color: "#EE779A",
  },
  {
    name: "For Startups and Entrepreneurs",
    text: "Access the right financial expertise & your books in order in preparation for investments.",
    color: "#6CC8B6",
  },
  {
    name: "For Creatives and Freelancers",
    text: "Put order to your financial needs whether managing your rates, or tracking expenses.",
    color: "#5A69F6",
  },
];

function WhoWeHaveBuiltFor() {
  return (
    <section className="px-4 py-2 md:px-12 md:py-10 lg:px-28 lg:py-20 xl:px-[11.6vw] xl:py-[5.55vw] flex flex-col bg-[#FCFBFF]">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-[3.8vw] font-semibold text-[#121217] xl:leading-[142.85%]">
          Who we built accountable for?
        </h1>
        <p className="mt-2 lg:mt-3 xl:mt-[0.83vw] font-[400] text-[#6B7280] text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%]">
          We genuinely love and care deeply for our customers and they love us
          as well.
        </p>
      </div>
      <div className="mt-8 md:mt-12 lg:mt-16 xl:mt-[4.4vw] flex-wrap flex items-center justify-between">
        {whoWeHaveBuiltFor.map((item, index) => {
          return (
            <div
              key={index}
              className="md:w-[32%] flex flex-col items-center  text-center bg-[#FFF] rounded-3xl xl:rounded-[32px] px-4 py-6 xl:px-[1.18vw] xl:py-[1.67vw] md:min-h-[300px] xl:min-h-[200px]"
            >
              <div
                className={`w-10 h-10 md:w-[44px] md:h-[44px] rounded-full `}
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.40)",
                  backgroundColor: `${item.color}`,
                }}
              ></div>
              <h2 className=" mt-2 lg:mt-4 xl:mt-[1.1vw] text-[#000] font-semibold text-base md:text-lg lg:text-xl xl:text-[1.39vw] xl:leading-[140%]">
                {item.name}
              </h2>
              <p className="mt-2 xl:mt-[0.55vw] text-[#6B7280] text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%]">
                {item.text}
              </p>
              {/* <div className="mt-4 xl:mt-[1.1vw] text-[#071A7E] font-medium cursor-pointer flex items-center text-sm md:text-base xl:text-[1.1vw]">
                <span>Learn more</span>
              </div> */}
            </div>
          );
        })}
      </div>
      <div className="mt-6 md:mt-12 lg:mt-16 xl:mt-[4.4vw] text-[#121217] w-[90%] md:w-[85%] lg:w-[75%] xl:w-[60%] mx-auto">
        <h1 className="font-medium text-center text-lg md:text-xl lg:text-2xl xl:text-[1.94vw]  xl:leading-[120%]">
          “Accountable has done something remarkable for myself and my business”
        </h1>
        <div className="mt-6 xl:mt-[1.67vw] flex items-center justify-center">
          <Image
            src={"/Ellipse 983.svg"}
            alt="Profile picture"
            width={0}
            height={0}
            // sizes="100vw"
            // style={{ width: "100%", height: "auto" }}
            className="w-12 h-12 xl:w-[3.3vw] xl:h-[3.3vw] rounded-full border "
          />
          <div className="ml-4 xl:ml-[1.1vw] text-sm md:text-base xl:text-[1.1vw] 2xl:space-y-[0.6vw]">
            <h2>Chris Adolphus</h2>
            <p className="text-[#6B7280]">CEO of Aton</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeHaveBuiltFor;
