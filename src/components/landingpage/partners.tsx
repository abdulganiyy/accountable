import Image from "next/image";
import React from "react";
// import techCarbal from "../assets/640a3c143676a775721eda71_techCabal.png";
// import businessDay from "../assets/640a3c141d7c9728a163221e_businessDay.png";
// import techPoint from "../assets/640a3c14f03c2f0e0977ea47_techPoint.png";
import Link from "next/link";

const sponsors = [
  {
    link: "https://businessday.ng/brands-advertising/article/firm-opens-operation-to-provide-financial-solutions-for-businesses/",
    sponsor: "/640a3c143676a775721eda71_techCabal.png",
  },
  {
    link: "https://techcabal.com/2023/03/13/accountable-wants-to-help-startups-outlive-their-founders/?utm_source=dlvr.it&utm_medium=twitter",
    sponsor: "/640a3c141d7c9728a163221e_businessDay.png",
  },
  {
    link: "https://techpoint.africa/2023/03/28/accountable-calls-for-easing-the-financial-burden-of-smes/",
    sponsor: "/640a3c14f03c2f0e0977ea47_techPoint.png",
  },
];

function Partners() {
  return (
    <section className="px-8 py-12 lg:px-16 lg:py-16 xl:px-[8%] xl:py-[8vw]">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-[3.8vw] font-semibold text-[#121217] xl:leading-[142.85%]">
          We have been featured in the press
        </h1>
        <p className="mt-2 lg:mt-3 xl:mt-[0.83vw] font-[400] text-[#6B7280] text-sm md:text-base xl:text-[1.1vw] xl:leading-[120%]">
          We tell our stories and how our experiences have shaped our solution
        </p>
      </div>
      <div className="px-6 py-12 lg:px-16 lg:py-16 xl:px-0 xl:py-[4vw] flex items-center justify-between ">
        {sponsors.map(({ sponsor, link }, index) => {
          return (
            <Link
              href={link}
              target="_blank"
              key={index}
              className="w-[25%] flex items-center justify-center "
            >
              <div>
                <Image
                  src={sponsor}
                  alt="partner logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Partners;
