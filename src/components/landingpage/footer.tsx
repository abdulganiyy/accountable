import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import logo from "Frame 55accountable-logo.svg";
// import facebook from "Download and App SVGs_FB.svg";
// import instagram from "Download and App SVGs_IG.svg";
// import twitter from "Download and App SVGs_Twitter.svg";
// import linkedin from "Download and App SVGs_LinkedIn.svg";

const faqs = [
  {
    question: " What is Accountable, and who is it designed for?",
    answer:
      "Accountable is a cloud-based accounting platform designed for small business owners, startups, entrepreneurs, freelancers, and creative professionals.Accountable connects you to dedicated financial experts. It offers a range of financial management tools, expert support, and services to streamline accounting processes.",
  },
  {
    question: "What features does Accountable offer for financial management?",
    answer:
      "Accountable provides features such as bookkeeping, invoicing, expense tracking, tax preparation, financial reporting, and expert advisory services. You can access a centralised dashboard for an overview of their financial health.",
  },
  {
    question:
      "How does Accountable support meeting scheduling and virtual meetings?",
    answer:
      "Accountable integrates meeting scheduling capabilities, allowing you to set up appointments with financial experts directly through the platform. Virtual meetings can be conducted seamlessly within Accountable for personalised consultations.",
  },
  {
    question: "Can I customise financial reports using Accountable?",
    answer:
      "Yes, Accountable offers customisable financial reporting. You can tailor reports to their specific needs, providing insights into income statements, balance sheets, and other financial metrics.",
  },
  {
    question: "How does Accountable help with tax preparation?",
    answer:
      "Accountable assists users with tax preparation by offering expert guidance on navigating tax regulations. Users can also access tax-related services to ensure compliance and optimise their tax strategy.",
  },
  {
    question: " Is there a document management feature in Accountable?",
    answer:
      "Yes, Accountable includes document management. You can securely store and manage important financial documents, receipts, and files within the platform.",
  },
  {
    question:
      "Can I collaborate with my team or financial professionals on Accountable?",
    answer:
      "Absolutely. Accountable provides collaboration tools, allowing you to work seamlessly with team members or financial professionals. This includes features for document sharing and communication within the platform.",
  },
  {
    question: "What security measures does Accountable have in place?",
    answer:
      "Accountable prioritises the security of user data. Our platform implements industry-standard security measures, including encryption and secure access controls, to protect sensitive financial information.",
  },
  {
    question: "How do I get started with Accountable?",
    answer:
      "To get started with Accountable, visit our website getaccountable.com and sign up for a free trial. Once registered, you can explore the platform's features and begin your journey to simplified and efficient financial management.",
  },
  {
    question: "When should I consider outsourcing my accounting?",
    answer:
      "If your company needs the resources of a complete accounting team but is not in a position to support the costs and management time of that entire, full-time team, then outsourcing your accounting functions is a very viable, flexible, and turn-key option for your business.",
  },
  {
    question: "How is bookkeeping different from accounting?",
    answer:
      "Bookkeeping records financial transactions, while accounting interprets and analyses financial data to provide strategic advice. While bookkeeping is focused on the daily recording and organising of financial transactions, accounting involves the interpretation and analysis of financial data to provide strategic advice and make recommendations. You can have both on our Essential plan",
  },
  {
    question: "What can Accountable do for me?",
    answer:
      "With over 52 million SMEs in Africa, less than 60 African-owned businesses are actually 100 years or older. That's why we exist - to support you through your journey and provide you with the tools and resources you need to succeed. We understand that managing your finances can be challenging, especially for SMEs and NGOs. We also offer a specific program for creatives - musicians, producers, influencers, art directors etc.",
  },
  {
    question: "How can I avoid tax problems and penalties?",
    answer:
      "To avoid tax problems and penalties, it is important to keep accurate and complete records, file tax returns on time, and pay taxes owed in full and on time. It is also important to stay up-to-date on changes to tax laws and regulations and seek professional advice when necessary.",
  },
];

function FAQ() {
  return (
    <div className="">
      <h1 className="text-xl text-white md:text-2xl lg:text-4xl xl:text-[3.33vw] font-semibold xl:leading-[142.85%]">
        Frequently asked questions
      </h1>
      <hr />
      <div className="grid grid-cols-6 gap-6 xl:gap-[1.66vw] mt-6 xl:mt-[3vw]">
        {faqs.map(({ question, answer }, index: number) => {
          return (
            <div key={index} className="col-span-6 md:col-span-3">
              <h6 className="text-white text-lg xl:text-[1.3vw] font-semibold">
                {question}
              </h6>
              <p className="text-white opacity-60 text-base xl:text-[1.1vw] xl:leading-[155%] font-[400] mt-3 xl:mt-[0.83vw]">
                {answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Footer() {
  const router = useRouter();
  return (
    <>
      <section className="px-8 py-12 lg:px-16 lg:py-16 xl:px-[8%] xl:py-[8vw] bg-[#0E1E40]">
        <FAQ />
        <div className="mt-12 xl:mt-[6.1vw]">
          <h1 className="text-center text-xl text-white md:text-2xl lg:text-4xl xl:text-[3.33vw] font-semibold xl:leading-[142.85%]">
            Get started for free today
          </h1>
          <p className="text-white text-center opacity-60 text-base xl:text-[1.1vw] xl:leading-[155%] font-[400] md:w-[60%] mx-auto">
            Get all the best financial products for your business growth for
            free.Open the last current account you will ever need for your
            business
          </p>
          <div className="mt-8 xl:mt-[2.22vw] flex items-center justify-center ">
            <button
              onClick={() => {
                router.push("/signup");
              }}
              className=" px-5 py-3 xl:px-0 xl:py-0 xl:w-[12vw] xl:h-[3.88vw] xl:text-[1.1vw] outline outline-1 outline-[#03045E] bg-[#D9A01B] text-[#FFFFFF] rounded-xl"
            >
              Get started
            </button>
            <button className="outline outline-1 outline-[#03045E] bg-white px-5 py-3 xl:px-0 xl:py-0 xl:w-[12vw] xl:h-[3.88vw] xl:text-[1.1vw] text-[#03045E] rounded-lg ml-[3%]">
              Book a call
            </button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-8 gap-16 xl:gap-[3.33vw] py-12 xl:py-[2.77vw] bg-[#0E1E40] px-12 xl:pl-[8%] xl:px-0">
        <div className="col-span-8 md:col-span-4 lg:col-span-2 ">
          <Image
            src={"/Frame 55accountable-logo.svg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
            alt="partner logo"
          />
          <p className="text-white text-sm xl:text-[0.97vw] xl:leading-[150%] font-[500] opacity-70 mt-8 xl:mt-[2.2vw] w-[80%]">
            Your accounting & bookkeeping needs on steroids
          </p>
          <div className="grid grid-cols-4 gap-3 w-[60%] mt-8 xl:mt-[2.2vw]">
            <Image
              src={"/Download and App SVGs_FB.svg"}
              width={16}
              height={16}
              // sizes="100vw"
              alt="partner logo"
              // style={{ width: "100%", height: "auto" }} // optional
              // className="col-span-1"
            />
            <Image
              src={"/Download and App SVGs_IG.svg"}
              width={16}
              height={16}
              // sizes="100vw"
              alt="partner logo"
              // style={{ width: "100%", height: "auto" }} // optional
              // className="col-span-1"
            />
            <Image
              src={"/Download and App SVGs_Twitter.svg"}
              width={16}
              height={16}
              // sizes="100vw"
              // style={{ width: "100%", height: "auto" }} // optional
              alt="partner logo"
              // className="col-span-1"
            />
            <Image
              src={"/Download and App SVGs_LinkedIn.svg"}
              width={16}
              height={16}
              // sizes="100vw"
              // style={{ width: "100%", height: "auto" }} // optional
              alt="partner logo"
              // className="col-span-1"
            />
          </div>
        </div>
        <div className="col-span-8 md:col-span-4 lg:col-span-2 space-y-4 xl:space-y-[1.1vw]">
          <h6 className="text-[12px] xl:text-[0.83vw] font-[500] text-white">
            Our Services
          </h6>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Accountable PISP
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Monthly Bookkeeping
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Tax filing and Advisory
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Accountable FMCC
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Catchup Accounting
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Retroactive Accounting
          </p>
        </div>
        <div className="col-span-8 md:col-span-4 lg:col-span-2 space-y-4 xl:space-y-[1.1vw]">
          <h6 className="text-[12px] xl:text-[0.83vw] font-[500] text-white">
            About Accountable
          </h6>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            About us
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Career
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Our Blog
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Help Center
          </p>
        </div>
        <div className="col-span-8 md:col-span-4 lg:col-span-2 space-y-4 xl:space-y-[1.1vw]">
          <h6 className="text-[12px] xl:text-[0.83vw] font-[500] text-white">
            Security
          </h6>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Terms of Service
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            Data Policy
          </p>
          <p className="text-sm xl:text-[0.97vw] font-[400] opacity-60 text-white">
            FAQ
          </p>
        </div>
      </section>
      <section className="px-8 py-12 lg:px-16 lg:py-4 xl:px-[4%] xl:py-[2vw] bg-[#0E1E40]">
        <hr className="bg-white opacity-70" />
        <p className="text-center text-white opacity-70 text-sm xl:text-[0.97vw] py-4 xl:py-[1.6vw]">
          © 2023 Accountable, Inc. All Rights Reserved.
        </p>
      </section>
    </>
  );
}

export default Footer;
