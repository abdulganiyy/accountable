"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import {
  ArrowSquareOut,
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
  PencilSimple,
  ArrowRight,
  Coins,
  ArrowDown,
  FileCsv,
} from "@phosphor-icons/react";
import { Portal } from "@/components/Portal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "@/components/inputs/DatePicker";

import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  LIST_TRIAL_BALANCE,
  TRIAL_BALANCE_BREAKDOWN,
  TRIAL_BALANCE_DETAILS,
  EXTRACT_TRIAL_BALANCE,
  EXTRACT_STATEMENTS,
  LINKED_ACCOUNTS,
} from "@/graphql/queries";
import { GENERATE_STATEMENTS } from "@/graphql/mutations";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import LinkBanks from "@/components/LinkBanks";
import { handleCSVExport } from "@/utils/csvExport";
import { BeatLoader } from "react-spinners";
import { formatNumberWithCommas } from "@/utils";
import Statements from "./fragments/statement";

ChartJS.register(ArcElement);

const schema = yup.object({
  from: yup.string().required(),
  to: yup.string().required(),
});

const Page = () => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedChart, setSelectedChart] = useState<any>(null);
  const [showStatements, setShowStatements] = useState(false);
  const [activeStatement, setActiveStatement] = useState("overview");
  // const [trialBalance, setTrialBalance] = useState<any>(null);
  const [trialBalanceBreakdown, setTrialBalanceBreakdown] = useState<any>(null);
  const [statements, setStatements] = useState(null);
  const [linkBanks, setLinkBanks] = useState(false);
  const [isLinkedAccounts, setIsLinkedAccounts] = useState(false);

  const { loading, data, error } = useQuery(EXTRACT_TRIAL_BALANCE, {
    variables: { input: { year: 2023 } },
  });
  const trialBalance = data?.extractTrialBalance?.data;

  // const [getBreakdown, { loading, data, error }] = useLazyQuery(
  //   TRIAL_BALANCE_BREAKDOWN
  // );

  // const {
  //   loading: loadingg,
  //   data: result,
  //   error: errorMessage,
  // } = useQuery(TRIAL_BALANCE_DETAILS, {
  //   variables: { input: { trial_balance_id: "28" } },
  // });

  // useEffect(() => {
  //   // console.log(result);
  //   if (data?.extractTrialBalance?.code) {
  //     console.log(data?.extractTrialBalance?.code);
  //   } else if (data?.extractTrialBalance?.data) {
  //     console.log(data?.extractTrialBalance?.data);
  //     setTrialBalance(data?.extractTrialBalance?.data);
  //   }
  // }, [data]);

  useEffect(() => {
    extractStatements({
      variables: {
        input: {
          year: 2022,
        },
      },
    });
  }, []);

  // useEffect(() => {
  //   console.log(data);
  //   if (data?.trialBalanceAccountBreakdown?.code) {
  //     console.log(data?.trialBalanceAccountBreakdown?.code);
  //   } else if (data?.trialBalanceAccountBreakdown?.data) {
  //     // console.log(data?.trialBalanceAccountBreakdown?.data?.data);
  //     setTrialBalanceBreakdown(data?.trialBalanceAccountBreakdown?.data);
  //   }
  // }, [data]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [extractStatements, res] = useLazyQuery(EXTRACT_STATEMENTS, {});

  useEffect(() => {
    if (res?.data?.extractFinancialStatement?.code) {
    } else if (res?.data?.extractFinancialStatement?.data) {
      setShowStatements(true);
      setStatements(res?.data?.extractFinancialStatement?.data["2022"]);
      // setTrialBalanceBreakdown(res?.data?.extractFinancialStatement?.data?.results);
    }
  }, [res]);

  const onSubmit = (data: any) => {
   
    // generateStatements({
    //   variables: {
    //     input: {
    //       start_date: data.from,
    //       end_date: data.to,
    //       trial_balance_id: "28",
    //     },
    //   },
    // });
    setShowStatements(true);
    setShowTimePicker(false);
  };

  // console.log(trialBalanceBreakdown);

  const result = useQuery(LINKED_ACCOUNTS, {
    variables: {
      input: {
        bankAccount: true,
      },
    },
    onCompleted(data) {
      setIsLinkedAccounts(true);
    },
    onError(error) {
      console.log(error);
    },
  });

  if (loading || result.loading)
    return (
      <div className="h-full flex items-center justify-center">
        <BeatLoader />
      </div>
    );

  return (
    <>
      {!trialBalance && !loading ? (
        <>
          {isLinkedAccounts ? (
            <>
              <h3 className="font-extrabold text-[28px] leading-[41px] text-[#060809]">
                Accounting
              </h3>
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
            </>
          ) : (
            <>
              <h3 className="font-extrabold text-[28px] leading-[41px] text-[#060809]">
                Accounting
              </h3>
              <div className="flex gap-x-2 p-4 border-[1px] border-[#B3B5CE] border-dashed mt-6 rounded-[4px]">
                <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] rounded-[8px] flex items-center justify-center">
                  <Info size={20} />
                </span>
                <div>
                  <div className="text-[#060709] font-semibold text-[16px] leading-[23px]">
                    You have no account statements yet.
                  </div>
                  <div className="text-[#414141] text-[14px] leading-[20px]">
                    Kindly contact your account manager to access your financial
                    statement
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center flex-wrap">
            <div className="md:w-[60%]">
              <h3 className="font-extrabold text-[28px] leading-[41px] text-[#060809]">
                Accounting
              </h3>
              <p className="text-[#4C5259] text-sm md:text-[16px] leading-[23px]">
                Track your financial data and manage your company{"s"} financial
                health
              </p>
            </div>
            <Button
              className="border-[2px] border-[#00085A] bg-white text-[#00085A] w-[156px] mt-2 md:mt-0"
              onClick={() => {
                setLinkBanks(true);
              }}
            >
              Link a new bank
            </Button>
          </div>
          {/* {showStatements && ( */}
          <Statements
            activeStatement={activeStatement}
            setActiveStatement={setActiveStatement}
            statements={statements}
          />
          {/* )} */}
          {activeStatement === "overview" && (
            <div className="mt-8 grid grid-cols-10 gap-x-6 ">
              <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl col-span-full overflow-x-scroll">
                <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                  <span>Trial Balance</span>

                  {/* <button
                onClick={() => {
                  // setShowTimePicker(true);
                  extractStatements({
                    variables: {
                      input: {
                        year: 2022,
                      },
                    },
                  });
                  // setShowStatements(true);
                }}
                className="w-[150px] bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px]"
              >
                
                View Statements
              </button> */}
                </div>
                <div className="md:p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[#021645]">
                        <th className="px-3.5 py-3 text-left">ACCOUNTS</th>
                        <th className="px-3.5 py-3 text-right">DEBIT (₦)</th>
                        <th className="px-3.5 py-3 text-right">CREDIT (₦)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trialBalance?.elements?.length &&
                        trialBalance?.elements?.map(
                          (accountt: any, i: number) => {
                            // console.log(accountt);
                            const { element, names, debit, credit } = accountt;
                            return (
                              <>
                                <tr
                                  key={i}
                                  className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]"
                                >
                                  <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                                    <span className="flex items-center gap-x-1">
                                      <span>{element}</span>
                                      <span>
                                        <PencilSimple size={14} />
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-3.5 py-3 text-right"></td>
                                  <td className="px-3.5 py-3 text-right"></td>
                                </tr>
                                {names.map((account_type: any, i: number) => {
                                  return (
                                    <tr
                                      key={i}
                                      className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]"
                                    >
                                      <td className="px-3.5 py-3 text-left">
                                        <span className="flex items-center gap-x-1">
                                          <span
                                            className="cursor-pointer"
                                            // onClick={() => {
                                            //   getBreakdown({
                                            //     variables: {
                                            //       input: {
                                            //         account,
                                            //         account_type:
                                            //           account_type?.account_type,
                                            //         trial_balance_id: `${trialBalance?.id}`,
                                            //       },
                                            //     },
                                            //   });
                                            // }}
                                          >
                                            {account_type?.name}
                                          </span>
                                          {/* <span>
                                          <ArrowSquareOut size={12} />
                                        </span> */}
                                        </span>
                                      </td>
                                      <td className="px-3.5 py-3 text-right">
                                        {formatNumberWithCommas(
                                          account_type?.debit
                                        )}
                                      </td>
                                      <td className="px-3.5 py-3 text-right">
                                        {formatNumberWithCommas(
                                          account_type?.credit
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                                <tr className="border-b-[1px] border-[#E7E7E7] font-bold text-[14px] leading-[16px] text-[#021645]">
                                  <td className="px-3.5 py-3 text-left">
                                    Total {element}
                                  </td>
                                  <td className="px-3.5 py-3 text-right">
                                    {formatNumberWithCommas(debit)}
                                  </td>
                                  <td className="px-3.5 py-3 text-right">
                                    {formatNumberWithCommas(credit)}
                                  </td>
                                </tr>
                                <tr className="">
                                  <td className="px-3.5 py-3 text-left"></td>
                                  <td className="px-3.5 py-3 text-right"></td>
                                  <td className="px-3.5 py-3 text-right"></td>
                                </tr>
                              </>
                            );
                          }
                        )}
                      <tr className="border-t-[2px] border-t-[#021645] border-b-[1px] border-[#E7E7E7] font-bold text-[16px] leading-[24px] text-[#021645]">
                        <td className="px-3.5 py-3 text-left">
                          All Account Total
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          {formatNumberWithCommas(trialBalance?.debit)}
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          {formatNumberWithCommas(trialBalance?.credit)}
                        </td>
                      </tr>
                    </tbody>
                    {/* <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      <span className="flex items-center gap-x-1">
                        <span>Assets</span>
                        <span>
                          <PencilSimple size={14} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr> */}
                    {/* <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>Account Receivable</span>
                        <span>
                          <ArrowSquareOut size={12} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>Computer Equipment</span>
                        <span>
                          <ArrowSquareOut size={12} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                  </tr> */}
                    {/* <>
                  <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      <span className="flex items-center gap-x-1">
                        <span>Liability</span>
                        <span>
                          <PencilSimple size={14} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>Accounts Payable</span>
                        <span>
                          <ArrowSquareOut size={12} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>Sales Tax</span>
                        <span>
                          <ArrowSquareOut size={12} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>Historical Adjustment</span>
                        <span>
                          <ArrowSquareOut size={12} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] font-bold text-[14px] leading-[16px] text-[#021645]">
                    <td className="px-3.5 py-3 text-left">Total Liability</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="">
                    <td className="px-3.5 py-3 text-left"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                </>
                <>
                  <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      <span className="flex items-center gap-x-1">
                        <span>Revenue</span>
                        <span>
                          <PencilSimple size={14} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>Sales</span>
                        <span>
                          <ArrowSquareOut size={12} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] font-bold text-[14px] leading-[16px] text-[#021645]">
                    <td className="px-3.5 py-3 text-left">Total Revenue</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="">
                    <td className="px-3.5 py-3 text-left"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                </>
                <>
                  <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      <span className="flex items-center gap-x-1">
                        <span>Expenses</span>
                        <span>
                          <PencilSimple size={14} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>Advertising</span>
                        <span>
                          <ArrowSquareOut size={12} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] font-bold text-[14px] leading-[16px] text-[#021645]">
                    <td className="px-3.5 py-3 text-left">Total Expenses</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                  <tr className="">
                    <td className="px-3.5 py-3 text-left"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                  <tr className="border-t-[2px] border-t-[#021645] border-b-[1px] border-[#E7E7E7] font-bold text-[16px] leading-[24px] text-[#021645]">
                    <td className="px-3.5 py-3 text-left">All Account Total</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                    <td className="px-3.5 py-3 text-right">0.00</td>
                  </tr>
                </> */}
                  </table>
                </div>
              </div>
              {/* <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
            <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
              <span>Chart Transactions </span>
            </div>
            <div className="p-6 ">
              {trialBalanceBreakdown ? (
                <div className="">
                  <div className="bg-[#F8F9FE] p-3 text-[#04050F] font-medium text-[16px] leading-[23.2px]">
                    {trialBalanceBreakdown[0].account?.account_type}
                  </div>
                  <div className="overflow-y-auto max-h-[779px]">
                    <div>
                      {trialBalanceBreakdown?.map((item: any, i: number) => (
                        <Transaction
                          amount={`${item?.currency}${item?.amount}`}
                          description={item?.description}
                          date={item?.date}
                          key={i}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-[128px]">
                  <Image
                    alt="emptychart"
                    src="/emptychart.svg"
                    height={172}
                    width={104}
                  />
                  <p className="mt-6 text-[#021645] max-w-[208px] text-center text-[16px] leading-[23.2px]">
                    Click on an account to view the transactions here
                  </p>
                </div>
              )}
            </div>
          </div> */}
            </div>
          )}
          {showTimePicker && (
            <Portal onClose={() => setShowTimePicker(false)}>
              <div className="w-[546px] h-[341px] bg-white rounded-[16px]">
                <div className="px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
                  Auto-generate Statements
                  <p className="text-[14px] leading-[20px] text-[#4C5259] max-w-[466px]">
                    This would create an overview of your income statement,
                    cash-balance statements and balance sheets
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="">
                    <div className="flex flex-col gap-y-4 px-6 py-4">
                      <div className="grid grid-cols-2 gap-2">
                        <DatePicker
                          label="From"
                          placeholder="02/04/2023"
                          register={register}
                          name="from"
                          errorMessage={errors?.from?.message}
                        />
                        <DatePicker
                          label="To"
                          placeholder="02/04/2023"
                          register={register}
                          name="to"
                          errorMessage={errors?.to?.message}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-x-2 py-3 rounded-b-[16px] mt-5 bg-[#F2F3F7] px-6 h-[105px]">
                      <Button
                        onClick={() => setShowTimePicker(false)}
                        type="button"
                        className="w-[95px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="w-[196px]"
                        disabled={!isValid || isSubmitting}
                        type="submit"
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Portal>
          )}
          {linkBanks && (
            <LinkBanks
              onClose={() => {
                setLinkBanks(false);
              }}
              successHandler={() => {
                setLinkBanks(false);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Page;

// <div className="p-6 grid grid-cols-3 gap-x-6">
//   <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
//     <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
//       <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
//         <Coins size={20} />
//       </span>
//       <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
//         Revenue <Info />
//       </span>
//       <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
//         {"₦ XXX"}
//       </span>
//     </div>
//   </div>
//   <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
//     <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
//       <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
//         <ArrowDown size={20} />
//       </span>
//       <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
//         Net Income <Info />
//       </span>
//       <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
//         {/* ₦70,000.01 */}
//         {"₦ XXX"}
//       </span>
//     </div>
//   </div>
//   <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
//     <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
//       <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
//         <Money size={20} />
//       </span>
//       <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
//         Expenses <Info />
//       </span>
//       <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
//         {/* ₦50,000.00 */}
//         {"₦ XXX"}
//       </span>
//     </div>
//   </div>
// </div>;
