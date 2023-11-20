"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { twMerge } from "tailwind-merge";
import { Portal } from "@/components/Portal";
import CallScheduler from "@/components/CallScheduler";
import UploadBankStatement from "@/components/UploadBankStatement";
import LinkBanks from "@/components/LinkBanks";
import InviteTeamMembers from "@/components/InviteTeamMembers";
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
import {
  GET_USER,
  FINANCIAL_SUMMARY,
  LINKED_ACCOUNTS,
} from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import FinancialSummary from "@/components/FinancialSummary";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
    const videoRef = React.useRef(null);
    const [videoFinished, setVideoFinished] = useState(true);

    const handleVideoEnd = () => {
      setVideoFinished(true);
    };


  const [active, setActive] = useState(1);
  const [callScheduled, setCallScheduled] = useState(false);
  const [linkBanks, setLinkBanks] = useState(false);
  const [uploadStatement, setUploadStatement] = useState(false);
  const [invite, setInvite] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [accountLinked, setAccountLinked] = useState<any>(false);
  const [trialBalanced, setTrialBalanced] = useState<any>(true);
  const [chooseService, setChooseService] = useState<any>(false);
  const timerId = useRef<any>(null);

  const { loading, data, error } = useQuery(GET_USER);
  const manager = data?.user?.data?.manager || null;

    const financialSummaryQuery = useQuery(FINANCIAL_SUMMARY);
    const summary = financialSummaryQuery?.data?.financialSummary?.data || null;
  
  const result = useQuery(LINKED_ACCOUNTS, {
    variables: {
      input: {
        bankAccount: true,
      },
    },
    onCompleted(data) {
      console.log("linked account",data);
    },
    onError(error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const storedUser = localStorage?.getItem("userData");
    if (storedUser) {
      console.log(JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // console.log(data);
    if (data?.user?.code) {
      console.log(data?.user?.code);
    } else if (data?.user?.data) {
      setAccountLinked(data?.user?.data?.linkedAccount);
    }
  }, [data]);

  // useEffect(() => {
  //   if (accountLinked) {
  //     // setTrialBalanced(true);

  //     timerId.current = setTimeout(() => {
  //       setTrialBalanced(true);
  //     }, 5000);
  //   }

  //   return () => {
  //     clearTimeout(timerId.current);
  //   };
  // }, [accountLinked, timerId]);

  if (loading || result.loading || financialSummaryQuery.loading)
    return (
      <div className="h-full flex items-center justify-center">
        <BeatLoader />
      </div>
    );

  return (
    <>
      {!result?.data?.linkedAccounts?.data.length ? (
        <div>
          <div>
            <h3 className="font-extrabold text-[28px] leading-[42px] text-[#060809]">
              Hello, {user?.firstName || ""}
            </h3>
            <p className="text-[#414141] text-[18px] leading-[28px]">
              Welcome to Accountable! {`Let's`} get started by completing a few
              quick steps.
            </p>
          </div>
          {videoFinished ? (
            <>
              <div className="h-[471px] bg-white border-[1px] border-[#E6E6E6] rounded-2xl mt-8">
                <div className="h-[68px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                  <div className="flex gap-x-4 items-center">
                    <span>Get Started</span>
                    <span className="px-2 py-1 bg-[#F2F3F7] text-[#00085A]">
                      Step {active} out of 4
                    </span>
                  </div>
                  <div className="w-[126px] grid grid-cols-4">
                    {[1, 2, 3, 4].map((item, i) => {
                      return (
                        <div
                          key={i}
                          className={
                            "cursor-pointer z-0 relative before:content-[''] before:absolute before:top-[12px] before:z-10 before:translate-x-2/4 before:w-full before:h-[2px] before:bg-[#E6E6E6] before:left-0 last:before:hidden"
                          }
                          // onClick={() => setActive(item)}
                        >
                          <div
                            className={twMerge(
                              "relative z-50 w-[24px] h-[24px] rounded-full bg-[#F2F3F7] text-[#00085A] flex justify-center items-center",
                              active === item && "bg-[#00085A] text-white",
                              active > item && "bg-[#00085A] text-white"
                            )}
                          >
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col items-center px-2 pt-12 gap-y-10">
                  {active === 1 ? (
                    <Image
                      alt="logo dashboard"
                      src="/logomain.svg"
                      height={72}
                      width={72}
                    />
                  ) : active === 2 ? (
                    <Image
                      alt="logo dashboard"
                      src="/box.svg"
                      height={72}
                      width={72}
                    />
                  ) : (
                    <Image
                      alt="logo dashboard"
                      src="/vault.svg"
                      height={72}
                      width={72}
                    />
                  )}
                  <div className="text-center">
                    <h4 className="text-[#04050F] font-semibold text-[16px] leading-[26px]">
                      {active === 1
                        ? "Get familiar with Accountable"
                        : active === 2
                        ? "Meet your Account Manager!"
                        : active === 3
                        ? "Link your bank account!"
                        : "Time to invite your team"}
                    </h4>
                    <p className="text-[14px] leading-[22px] max-w-[375px]">
                      {active === 1
                        ? ` Let’s get you started with Accountable through a simple
              walkthrough guide that explains how it works.`
                        : active === 2
                        ? `Let's introduce you to your Account Manager. Please schedule a meeting with them as your next step.`
                        : active === 3
                        ? `Instantly link your business bank account or upload your bank statement to Accountable to track and monitor your financial data.`
                        : "Invite your team members to join and manage your accounts together."}
                    </p>
                  </div>
                  <div className="flex gap-x-2">
                    {active === 1 ? (
                      <>
                        <Button
                          className="w-[184px]"
                          onClick={() => {
                            setVideoFinished(!videoFinished);
                            (videoRef?.current as any)?.play();
                          }}
                        >
                          Start the guide
                        </Button>
                        <Button
                          className="w-[184px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                          onClick={() => {
                            setActive(2);
                          }}
                        >
                          Continue
                        </Button>
                      </>
                    ) : active === 2 ? (
                      <Button
                        className="w-[300px] px-2"
                        onClick={() => {
                          if (!user?.manager) {
                            toast.error(
                              "You don't have an account manager yet"
                            );
                          } else {
                            setCallScheduled(true);
                          }
                        }}
                      >
                        Schedule call with Account Manager
                      </Button>
                    ) : active === 3 ? (
                      <>
                        <Button
                          onClick={() => setLinkBanks(true)}
                          className="w-[220px]"
                        >
                          Link your bank account
                        </Button>
                        <Button
                          onClick={() => setUploadStatement(true)}
                          className="w-[220px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                        >
                          Upload a bank statement
                        </Button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Button
                          onClick={() => setInvite(true)}
                          className="w-[188px]"
                        >
                          Invite team members
                        </Button>
                        <Button className="w-[200px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]">
                          Skip, I’ll do it later
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {callScheduled && (
                <CallScheduler
                  // setActive={setActive}
                  onClose={() => {
                    setCallScheduled(false);
                  }}
                  successHandler={() => {
                    setActive(3);
                  }}
                />
              )}
              {uploadStatement && (
                <UploadBankStatement
                  onClose={() => {
                    setUploadStatement(false);
                  }}
                  successHandler={() => {
                    // setAccountLinked(true);
                  }}
                />
              )}
              {linkBanks && (
                <LinkBanks
                  onClose={() => {
                    setLinkBanks(false);
                  }}
                  successHandler={() => {
                    setAccountLinked(true);
                    result.refetch();
                  }}
                />
              )}
              {invite && (
                <InviteTeamMembers
                  onClose={() => {
                    setInvite(false);
                  }}
                />
              )}
            </>
          ) : (
            <div className="xl:h-[471px] mt-8 overflow-hidden border-[1px] border-[#E6E6E6] rounded-2xl">
              <video
                className="w-full h-full "
                ref={videoRef}
                autoPlay
                src="./video.mp4"
                muted
                controls
                onEnded={handleVideoEnd}
                poster="./images/image 18.png"
              ></video>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="font-extrabold text-[28px] leading-[42px] text-[#060809]">
                Hello, {user?.firstName || ""} 🎉
              </h3>
              <p className="text-[#414141] text-[18px] leading-[28px]">
                Welcome, here’s the summary of all your financials
              </p>
            </div>
            <div className="bg-white flex items-center gap-x-2 px-5 py-4 rounded-[16px]">
              <span className="w-[40px] h-[40px] flex items-center justify-center bg-[#FAEAD4] rounded-full">
                C
              </span>
              <div className="flex flex-col">
                <span>
                  {manager?.firstName} {manager?.lastName}
                </span>
                <span>Your account manager</span>
              </div>
              <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full border-[1px] border-[#EAEDEF]">
                <CaretDown size={16} />
              </span>
            </div>
          </div>
          {!trialBalanced ? (
            <>
              <div className="flex gap-x-2 p-4 border-[1px] border-[#B3B5CE] border-dashed mt-6 rounded-[4px]">
                <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] rounded-[8px] flex items-center justify-center">
                  <Info size={20} />
                </span>
                <div>
                  <div className="text-[#060709] font-semibold text-[16px] leading-[23px]">
                    Processing your account statements
                  </div>
                  <div className="text-[#414141] text-[14px] leading-[20px]">
                    We re preparing your account statements to provide you with
                    an overview. You will see all your balances, spending, and
                    deposits in detail. This information will help you
                    understand your finances better and make smart decisions.
                  </div>
                </div>
              </div>
              <FinancialSummary summary={summary} />
            </>
          ) : (
            <FinancialSummary summary={summary} />
          )}
          <div className="mt-6 grid grid-cols-2 gap-x-6">
            <div className="h-[384px] bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span className="font-medium text-[18px] leading-[26px]">
                  Scheduled Meetings
                </span>
                <span className="text-[#00085A] text-[14px] leading-[20px]">
                  New Meeting
                </span>
              </div>
              <div className="flex flex-col items-center justify-center px-2 pt-6 gap-y-10">
                <Image
                  alt="calendar-icon"
                  src="/calendar-icon.svg"
                  height={72}
                  width={72}
                />
                <div className="text-center">
                  <p className="text-[14px] leading-[22px] max-w-[338px] pt-4">
                    You can schedule a call with your account to complete setup
                  </p>
                  <span className="mx-auto block w-[184px] pt-[40px]">
                    <Button className="border-[2px] border-[#00085A] bg-white text-[#00085A]">
                      Book first meeting
                    </Button>
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[384px] bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span className="text-[18px] leading-[26px]">Reports</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2 pt-6 gap-y-10">
                <Image
                  alt="report-icon"
                  src="/report.svg"
                  height={72}
                  width={72}
                />
                <div className="text-center">
                  <p className="text-[14px] leading-[22px] max-w-[338px] pt-4">
                    You can view all reports your account manager sends you *
                    needs copy
                  </p>
                  <span className="mx-auto block w-[184px] pt-[40px]">
                    <Button className="border-[2px] border-[#00085A] bg-white text-[#00085A]">
                      Generate report
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl mt-6">
            <div className="h-[68px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
              Services we provide
              <button
                onClick={() => {
                  setChooseService(true);
                }}
                className="bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px]"
              >
                Purchase a service
              </button>
            </div>
            <div className="p-6 grid grid-cols-3 gap-6">
              <ServiceCard
                icon={<Book size={20} />}
                name="Monthly Bookkeeping"
                price="₦26,000.00 / month"
              />
              <ServiceCard
                icon={<Percent size={20} />}
                name="Tax Filling & Advisory"
                price="₦26,000.00 / month"
              />
              <ServiceCard
                icon={<Calculator size={20} />}
                name="Catchup Accounting"
                price="₦26,000.00 / month"
              />
              <ServiceCard
                icon={<BookOpen size={20} />}
                name="Retroactive Accounting"
                price="₦26,000.00 / month"
              />
              <ServiceCard
                icon={<Money size={20} />}
                name="Creatives Financial Managem..."
                price="₦26,000.00 / month"
              />
              <ServiceCard
                icon={<ChartLineUp size={20} />}
                name="Process Improvement"
                price="₦26,000.00 / month"
              />
              <ServiceCard
                icon={<Notepad size={20} />}
                name="Succession Planning"
                price="₦26,000.00 / month"
              />
            </div>
          </div> */}
          {/* {chooseService && (
            <ServicePicker
              onClose={() => {
                setChooseService(false);
              }}
            />
          )} */}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Page;
