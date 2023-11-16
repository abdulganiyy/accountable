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
} from "@phosphor-icons/react";
import { Portal } from "@/components/Portal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "@/components/inputs/DatePicker";
import Image from "next/image";
import Transaction from "@/components/Transaction";
import TabButton from "@/components/buttons/TabButton";
import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  LIST_TRIAL_BALANCE,
  TRIAL_BALANCE_BREAKDOWN,
  TRIAL_BALANCE_DETAILS,
  EXTRACT_TRIAL_BALANCE,
  EXTRACT_STATEMENTS,
} from "@/graphql/queries";
import { GENERATE_STATEMENTS } from "@/graphql/mutations";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import LinkBanks from "@/components/LinkBanks";
import { handleCSVExport } from "@/utils/csvExport";
import { BeatLoader } from "react-spinners";

ChartJS.register(ArcElement);

const doughData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#94A3FA",
        "#C3C4F4",
        "#1C1C1C",
        "#ABDBF6",
        "#B3E4B6",
        // "rgba(255, 159, 64, 0.2)",
      ],
      // borderColor: [
      //   "rgba(255, 99, 132, 1)",
      //   "rgba(54, 162, 235, 1)",
      //   "rgba(255, 206, 86, 1)",
      //   "rgba(75, 192, 192, 1)",
      //   "rgba(153, 102, 255, 1)",
      //   "rgba(255, 159, 64, 1)",
      // ],
      borderWidth: 1,
    },
  ],
};

const schema = yup.object({
  from: yup.string().required(),
  to: yup.string().required(),
});

const lineData = [
  {
    name: "Jan",
    assets: 10,
    liabilities: 20,
  },
  {
    name: "Feb",
    assets: 5,
    liabilities: 10,
  },
  {
    name: "Mar",
    assets: 15,
    liabilities: 25,
  },
  {
    name: "Apr",
    assets: 10,
    liabilities: 20,
  },
  {
    name: "May",
    assets: 5,
    liabilities: 10,
  },
  {
    name: "Jun",
    assets: 15,
    liabilities: 25,
  },
  {
    name: "Jul",
    assets: 10,
    liabilities: 20,
  },
  {
    name: "Aug",
    assets: 5,
    liabilities: 10,
  },
  {
    name: "Sep",
    assets: 15,
    liabilities: 25,
  },
  {
    name: "Oct",
    assets: 10,
    liabilities: 20,
  },
  {
    name: "Nov",
    assets: 5,
    liabilities: 10,
  },
  {
    name: "Dec",
    assets: 15,
    liabilities: 25,
  },
];

const Percentile = ({ title, color, percentage, number }: any) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between text-[12px] leading-[18px] text-[#1C1C1C]">
        <span>{title}</span>
        <span>{number}%</span>
      </div>
      <div className={`w-full h-[2px] bg-[#A8C5DA]`}>
        <div className={`h-full ${color} ${percentage}`}></div>
      </div>
    </div>
  );
};

const Statements = ({
  statements,
  activeStatement,
  setActiveStatement,
}: any) => {
  // const [activeStatement, setActiveStatement] = useState("overview");
  const [more, setMore] = useState("");
  const [chartType, setChartType] = useState("line");
  console.log(statements);

  return (
    <div className="mt-[45px]">
      <div className="flex items-center gap-x-2">
        <TabButton
          active={activeStatement === "overview"}
          onClick={() => setActiveStatement("overview")}
        >
          Overview
        </TabButton>
        <TabButton
          active={activeStatement === "Profit or Loss"}
          onClick={() => setActiveStatement("Profit or Loss")}
        >
          Profit or Loss
        </TabButton>{" "}
        <TabButton
          active={activeStatement === "Financial Position"}
          onClick={() => setActiveStatement("Financial Position")}
        >
          Financial Position
        </TabButton>{" "}
        <TabButton
          active={activeStatement === "Cashflow Statement"}
          onClick={() => setActiveStatement("Cashflow Statement")}
        >
          Cashflow Statement
        </TabButton>
      </div>
      {activeStatement === "overview" && (
        <></>
        // <div>
        //   <div className="mt-6">
        //     <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
        //       <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
        //         <span>Financial Overview</span>
        //       </div>
        //       <div className="p-6 grid grid-cols-4 gap-x-6">
        //         <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
        //           <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
        //             <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
        //               <PokerChip size={20} />
        //             </span>
        //             <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
        //               Assets <Info />
        //             </span>
        //             <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
        //
        //               {"₦ XXX"}
        //             </span>
        //             <span
        //               onClick={() => {
        //                 setMore("assets");
        //               }}
        //               className="cursor-pointer text-[12px] leading-[17px] text-[#00085A] flex items-center gap-x-1 py-3 border-t-[1px] border-[#E6E6E6]"
        //             >
        //               <span>View more details</span>
        //               <ArrowRight size={16} />
        //             </span>
        //           </div>
        //         </div>
        //         <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
        //           <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
        //             <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
        //               <Coins size={20} />
        //             </span>
        //             <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
        //               Revenue <Info />
        //             </span>
        //             <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
        //
        //               {"₦ XXX"}
        //             </span>
        //             <span
        //               onClick={() => {
        //                 setMore("revenue");
        //               }}
        //               className="cursor-pointer text-[12px] leading-[17px] text-[#00085A] flex items-center gap-x-1 py-3 border-t-[1px] border-[#E6E6E6]"
        //             >
        //               <span>View more details</span>
        //               <ArrowRight size={16} />
        //             </span>
        //           </div>
        //         </div>
        //         <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
        //           <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
        //             <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
        //               <Money size={20} />
        //             </span>
        //             <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
        //               Expenditure <Info />
        //             </span>
        //             <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
        //
        //               {"₦ XXX"}
        //             </span>
        //             <span
        //               onClick={() => {
        //                 setMore("expenditure");
        //               }}
        //               className="cursor-pointer text-[12px] leading-[17px] text-[#00085A] flex items-center gap-x-1 py-3 border-t-[1px] border-[#E6E6E6]"
        //             >
        //               <span>View more details</span>
        //               <ArrowRight size={16} />
        //             </span>
        //           </div>
        //         </div>
        //         <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
        //           <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
        //             <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
        //               <Rocket size={20} />
        //             </span>
        //             <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
        //               Runway Duration <Info />
        //             </span>
        //             <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
        //               {/* 10 months */}
        //               {"XXX"}
        //             </span>
        //             <span
        //               onClick={() => {
        //                 setMore("runway duration");
        //               }}
        //               className="cursor-pointer text-[12px] leading-[17px] text-[#00085A] flex items-center gap-x-1 py-3 border-t-[1px] border-[#E6E6E6]"
        //             >
        //               <span>View more details</span>
        //               <ArrowRight size={16} />
        //             </span>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     {/* Charts */}
        //     <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl mt-6">
        //       <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
        //         <span>Charts</span>
        //       </div>
        //       <div className="px-5 py-6 grid grid-cols-[1fr,202px] gap-x-3">
        //         <div>
        //           {chartType === "line" ? (
        //             <div className="bg-[#F8F9FE] rounded-[16px] p-3">
        //               <div className="flex justify-between items-center mb-4">
        //                 <div>
        //                   <p>Assets & Liabilities</p>
        //                   <p className="flex items-center gap-x-2">
        //                     <span className="flex items-center gap-x-1">
        //                       <span className="h-[8px] w-[8px] rounded-full bg-[#F79009]"></span>
        //                       <span>Liabilities</span>
        //                     </span>
        //                     <span className="flex items-center gap-x-1">
        //                       <span className="h-[8px] w-[8px] rounded-full bg-[#A8C5DA]"></span>
        //                       <span>Assets</span>
        //                     </span>
        //                   </p>
        //                 </div>
        //                 <span
        //                   onClick={() => {}}
        //                   className="text-[12px] leading-[17px] text-[#00085A] flex items-center gap-x-1"
        //                 >
        //                   <span className="underline">View more details</span>
        //                   <ArrowRight size={16} />
        //                 </span>
        //               </div>
        //               <ResponsiveContainer width={"100%"} height={229}>
        //                 <LineChart data={lineData}>
        //                   <CartesianGrid vertical={false} />
        //                   <Line
        //                     type="monotone"
        //                     dataKey="assets"
        //                     stroke="#A8C5DA"
        //                   />
        //                   <Line
        //                     type="monotone"
        //                     dataKey="liabilities"
        //                     stroke="#F79009"
        //                   />

        //                   <YAxis
        //                     stroke="#1C1C1C66"
        //                     axisLine={false}
        //                     tickLine={false}
        //                     unit={"M"}
        //                   />
        //                   <XAxis
        //                     dataKey="name"
        //                     stroke="#1C1C1C66"
        //                     tickLine={false}
        //                   />
        //                   <Tooltip />
        //                 </LineChart>
        //               </ResponsiveContainer>
        //             </div>
        //           ) : (
        //             <div className="bg-[#F8F9FE] rounded-[16px] p-3">
        //               <div className="flex justify-between items-center mb-4">
        //                 <div>
        //                   <p>Assets & Liabilities</p>
        //                   <p className="flex items-center gap-x-2">
        //                     <span className="flex items-center gap-x-1">
        //                       <span className="h-[8px] w-[8px] rounded-full bg-[#F79009]"></span>
        //                       <span>Liabilities</span>
        //                     </span>
        //                     <span className="flex items-center gap-x-1">
        //                       <span className="h-[8px] w-[8px] rounded-full bg-[#A8C5DA]"></span>
        //                       <span>Assets</span>
        //                     </span>
        //                   </p>
        //                 </div>
        //                 <span
        //                   onClick={() => {}}
        //                   className="text-[12px] leading-[17px] text-[#00085A] flex items-center gap-x-1"
        //                 >
        //                   <span className="underline">View more details</span>
        //                   <ArrowRight size={16} />
        //                 </span>
        //               </div>
        //               <ResponsiveContainer width={"100%"} height={229}>
        //                 <BarChart data={lineData}>
        //                   <CartesianGrid vertical={false} />

        //                   <Bar dataKey="assets" fill="#A8C5DA" />
        //                   <Bar dataKey="liabilities" fill="#F79009" />

        //                   <YAxis
        //                     stroke="#1C1C1C66"
        //                     axisLine={false}
        //                     tickLine={false}
        //                     unit={"M"}
        //                   />
        //                   <XAxis
        //                     dataKey="name"
        //                     stroke="#1C1C1C66"
        //                     tickLine={false}
        //                   />
        //                   <Tooltip />
        //                 </BarChart>
        //               </ResponsiveContainer>
        //             </div>
        //           )}
        //           <div className="flex gap-x-[10px] pt-5 justify-center items-center">
        //             <label
        //               htmlFor="line"
        //               className="flex gap-x-[10px] items-center cursor-pointer"
        //             >
        //               <input
        //                 type="radio"
        //                 name="chartType"
        //                 value="line"
        //                 id="line"
        //                 onChange={(e) => {
        //                   setChartType(e.target.value);
        //                 }}
        //                 checked={chartType === "line"}
        //                 className="hidden peer w-3 h-3 border-[.5px] border-[#00085A] bg-white checked:bg-[#00085A] checked:border-[3px]"
        //               />
        //               <span className="w-3 h-3 border-[.5px] border-[#00085A] rounded-full peer-checked:border-[3px] shadow-sm inline-block"></span>
        //               {/* <span>2345 **** **** 345</span> */}
        //             </label>
        //             <label
        //               htmlFor="bar"
        //               className="cursor-pointer flex gap-x-[10px] items-center"
        //             >
        //               <input
        //                 type="radio"
        //                 name="chartType"
        //                 id="bar"
        //                 value="bar"
        //                 onChange={(e) => {
        //                   setChartType(e.target.value);
        //                 }}
        //                 checked={chartType === "bar"}
        //                 className="hidden peer w-3 h-3 border-[.5px] border-[#00085A] bg-white checked:bg-[#00085A] checked:border-[3px]"
        //               />
        //               <span className="w-3 h-3 border-[.5px] border-[#00085A] rounded-full peer-checked:border-[3px] shadow-sm inline-block"></span>
        //               {/* <span>2345 **** **** 345</span> */}
        //             </label>
        //           </div>
        //         </div>

        //         <div className="bg-[#F8F9FE] rounded-[16px] p-6">
        //           <div>Ratios</div>
        //           <Doughnut data={doughData} />
        //           <div className="mt-4 flex flex-col gap-y-2">
        //             <Percentile
        //               title="ROE"
        //               color="bg-[#94A3FA]"
        //               percentage="w-[50%]"
        //               number="50"
        //             />
        //             <Percentile
        //               title="Current Ratio"
        //               color="bg-[#94A3FA]"
        //               percentage="w-[50%]"
        //               number="50"
        //             />
        //             <Percentile
        //               title="Quick Ratio"
        //               color="bg-[#94A3FA]"
        //               percentage="w-[50%]"
        //               number="50"
        //             />
        //             <Percentile
        //               title="Ratio"
        //               color="bg-[#94A3FA]"
        //               percentage="w-[50%]"
        //               number="50"
        //             />
        //             <Percentile
        //               title="ROA"
        //               color="bg-[#94A3FA]"
        //               percentage="w-[50%]"
        //               number="50"
        //             />
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
      {activeStatement === "Profit or Loss" && (
        <div>
          <div className="mt-6 grid grid-cols-[1fr,359px] gap-x-6">
            <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span>Profit or Loss Statements</span>
                <div className="flex items-center gap-x-3">
                  {/* <button
                    onClick={() => {}}
                    className="text-[#555555] border-[1px] border-[#E7E7E7] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                  >
                    28 Feb 23 – 10 Mar 23 <CaretDown />
                  </button> */}
                  <button
                    onClick={() => {
                      handleCSVExport(
                        statements?.SPL,
                        "Statement of profit or loss"
                      );
                    }}
                    className="bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                    disabled={
                      !statements.SPL || statements.SPL?.items?.length === 0
                    }
                  >
                    Download
                    {/* as <CaretDown /> */}
                  </button>
                </div>
              </div>
              {/* commented the chart and moved it to the bottom */}
              <div className="p-6">
                <table className="w-full">
                  {statements?.SPL?.items?.map((item: any, i: number) => {
                    return (
                      <tr
                        className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]"
                        key={i}
                      >
                        <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                          {item?.element}
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          ₦{item?.value}
                        </td>
                      </tr>
                    );
                  })}
                  {/* <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        <span className="flex items-center gap-x-1">
                          <span>Gross Profit</span>
                          <span>
                            <CaretDown size={14} />
                          </span>
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">Revenue</td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">Cost Of Sales</td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="">
                      <td className="px-3.5 py-3 text-left"></td>
                      <td className="px-3.5 py-3 text-right"></td>
                    </tr>
                  </>
                  <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        <span className="flex items-center gap-x-1">
                          <span>Total Operating Expenses</span>
                          <span>
                            <CaretDown size={14} />
                          </span>
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Salaries and Wages
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Selling, General and Administrative Expenses
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Other Operating Expenses
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="">
                      <td className="px-3.5 py-3 text-left"></td>
                      <td className="px-3.5 py-3 text-right"></td>
                    </tr>
                  </>
                  <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        Taxes
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                  </> */}
                </table>
              </div>
            </div>
            <div className="bg-white rounded-[16px] h-[600px]">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span>Chart Transactions </span>
              </div>
              <div className="p-6">
                <div>
                  <p>Revenue & COGS (Cost of Goods) Chart</p>
                  <p className="flex items-center gap-x-2">
                    <span className="flex items-center gap-x-1">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#F79009]"></span>
                      <span>Liabilities</span>
                    </span>
                    <span className="flex items-center gap-x-1">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#A8C5DA]"></span>
                      <span>Assets</span>
                    </span>
                  </p>
                </div>
                <ResponsiveContainer width={"100%"} height={229}>
                  <LineChart data={lineData}>
                    <CartesianGrid vertical={false} />
                    <Line type="monotone" dataKey="assets" stroke="#A8C5DA" />
                    <Line
                      type="monotone"
                      dataKey="liabilities"
                      stroke="#F79009"
                    />

                    <YAxis
                      stroke="#1C1C1C66"
                      axisLine={false}
                      tickLine={false}
                      unit={"M"}
                    />
                    <XAxis dataKey="name" stroke="#1C1C1C66" tickLine={false} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6">
                  <div>Ratios</div>
                  <div className="flex items-center gap-x-[26px]">
                    <div className="w-[122px] h-[122px]">
                      <Doughnut width={122} height={122} data={doughData} />
                    </div>
                    <div className="mt-4 flex flex-col gap-y-2 w-full">
                      <Percentile
                        title="ROE"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Current Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Quick Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="ROA"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeStatement === "Financial Position" && (
        <div>
          <div className="mt-6 grid grid-cols-[1fr,359px] gap-x-6">
            <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span>Financial Position</span>
                <div className="flex items-center gap-x-3">
                  {/* <button
                    onClick={() => {}}
                    className="text-[#555555] border-[1px] border-[#E7E7E7] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                  >
                    28 Feb 23 – 10 Mar 23 <CaretDown />
                  </button> */}
                  <button
                    onClick={() => {
                      handleCSVExport(
                        statements?.SFP,
                        "Statement of Financial Position"
                      );
                    }}
                    className="bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                    disabled={
                      !statements.SFP || statements.SFP?.items?.length === 0
                    }
                  >
                    Download
                    {/* as <CaretDown /> */}
                  </button>
                </div>
              </div>
              {/* commented the chart and moved to the bottom */}
              <div className="p-6">
                <table className="w-full">
                  {statements?.SFP?.items?.map((item: any, i: number) => {
                    return (
                      <tr
                        className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]"
                        key={i}
                      >
                        <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                          {item?.element}
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          ₦{item?.value}
                        </td>
                      </tr>
                    );
                  })}
                  {/* <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        <span className="flex items-center gap-x-1">
                          <span>Gross Profit</span>
                          <span>
                            <CaretDown size={14} />
                          </span>
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">Revenue</td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">Cost Of Sales</td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="">
                      <td className="px-3.5 py-3 text-left"></td>
                      <td className="px-3.5 py-3 text-right"></td>
                    </tr>
                  </>
                  <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        <span className="flex items-center gap-x-1">
                          <span>Total Operating Expenses</span>
                          <span>
                            <CaretDown size={14} />
                          </span>
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Salaries and Wages
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Selling, General and Administrative Expenses
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Other Operating Expenses
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="">
                      <td className="px-3.5 py-3 text-left"></td>
                      <td className="px-3.5 py-3 text-right"></td>
                    </tr>
                  </>
                  <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        Taxes
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                  </> */}
                </table>
              </div>
            </div>
            <div className="bg-white rounded-[16px] h-[600px]">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span>Chart Transactions </span>
              </div>
              <div className="p-6">
                <div>
                  <p>Revenue & COGS (Cost of Goods) Chart</p>
                  <p className="flex items-center gap-x-2">
                    <span className="flex items-center gap-x-1">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#F79009]"></span>
                      <span>Liabilities</span>
                    </span>
                    <span className="flex items-center gap-x-1">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#A8C5DA]"></span>
                      <span>Assets</span>
                    </span>
                  </p>
                </div>
                <ResponsiveContainer width={"100%"} height={229}>
                  <LineChart data={lineData}>
                    <CartesianGrid vertical={false} />
                    <Line type="monotone" dataKey="assets" stroke="#A8C5DA" />
                    <Line
                      type="monotone"
                      dataKey="liabilities"
                      stroke="#F79009"
                    />

                    <YAxis
                      stroke="#1C1C1C66"
                      axisLine={false}
                      tickLine={false}
                      unit={"M"}
                    />
                    <XAxis dataKey="name" stroke="#1C1C1C66" tickLine={false} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6">
                  <div>Ratios</div>
                  <div className="flex items-center gap-x-[26px]">
                    <div className="w-[122px] h-[122px]">
                      <Doughnut width={122} height={122} data={doughData} />
                    </div>
                    <div className="mt-4 flex flex-col gap-y-2 w-full">
                      <Percentile
                        title="ROE"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Current Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Quick Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="ROA"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeStatement === "Cashflow Statement" && (
        <div>
          <div className="mt-6 grid grid-cols-[1fr,359px] gap-x-6">
            <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span>Cashflow Statement</span>
                <div className="flex items-center gap-x-3">
                  {/* <button
                    onClick={() => {}}
                    className="text-[#555555] border-[1px] border-[#E7E7E7] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                  >
                    28 Feb 23 – 10 Mar 23 <CaretDown />
                  </button> */}
                  <button
                    onClick={() => {
                      handleCSVExport(
                        statements?.SCF,
                        "Statement of Cash Flow"
                      );
                    }}
                    className="bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                    disabled={
                      !statements.SCF || statements.SCF?.items?.length === 0
                    }
                  >
                    Download
                    {/* as <CaretDown /> */}
                  </button>
                </div>
              </div>
              {/* commented the chart and moved to the bottom */}
              <div className="p-6">
                <table className="w-full">
                  {statements?.SCF?.items?.map((item: any, i: number) => {
                    return (
                      <tr
                        className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]"
                        key={i}
                      >
                        <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                          {item?.element}
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          ₦{item?.value}
                        </td>
                      </tr>
                    );
                  })}
                  {/* <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        <span className="flex items-center gap-x-1">
                          <span>Gross Profit</span>
                          <span>
                            <CaretDown size={14} />
                          </span>
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">Revenue</td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">Cost Of Sales</td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="">
                      <td className="px-3.5 py-3 text-left"></td>
                      <td className="px-3.5 py-3 text-right"></td>
                    </tr>
                  </>
                  <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        <span className="flex items-center gap-x-1">
                          <span>Total Operating Expenses</span>
                          <span>
                            <CaretDown size={14} />
                          </span>
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Salaries and Wages
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Selling, General and Administrative Expenses
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                      <td className="px-3.5 py-3 text-left">
                        Other Operating Expenses
                      </td>
                      <td className="px-3.5 py-3 text-right">10,545.64</td>
                    </tr>
                    <tr className="">
                      <td className="px-3.5 py-3 text-left"></td>
                      <td className="px-3.5 py-3 text-right"></td>
                    </tr>
                  </>
                  <>
                    <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                      <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                        Taxes
                      </td>
                      <td className="px-3.5 py-3 text-right">₦9,022.50</td>
                    </tr>
                  </> */}
                </table>
              </div>
            </div>
            <div className="bg-white rounded-[16px] h-[600px]">
              <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
                <span>Chart Transactions </span>
              </div>
              <div className="p-6">
                <div>
                  <p>Revenue & COGS (Cost of Goods) Chart</p>
                  <p className="flex items-center gap-x-2">
                    <span className="flex items-center gap-x-1">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#F79009]"></span>
                      <span>Liabilities</span>
                    </span>
                    <span className="flex items-center gap-x-1">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#A8C5DA]"></span>
                      <span>Assets</span>
                    </span>
                  </p>
                </div>
                <ResponsiveContainer width={"100%"} height={229}>
                  <AreaChart
                    data={lineData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis
                      stroke="#1C1C1C66"
                      axisLine={false}
                      tickLine={false}
                      unit={"M"}
                    />
                    <CartesianGrid vertical={false} />

                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="assets"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="liabilities"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-6">
                  <div>Ratios</div>
                  <div className="flex items-center gap-x-[26px]">
                    <div className="w-[122px] h-[122px]">
                      <Doughnut width={122} height={122} data={doughData} />
                    </div>
                    <div className="mt-4 flex flex-col gap-y-2 w-full">
                      <Percentile
                        title="ROE"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Current Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Quick Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="Ratio"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                      <Percentile
                        title="ROA"
                        color="bg-[#94A3FA]"
                        percentage="w-[50%]"
                        number="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {more === "assets" && (
        <Portal onClose={() => setMore("")}>
          <div className="w-[466px] bg-white rounded-[16px] flex flex-col">
            <div className="h-[60px] px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
              Asset details
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-[#4C5259] text-[14px] leading-[20px] font-medium">
                    Total Assets
                  </div>
                  <div className="text-[#04050F] text-[24px] leading-[35px] font-semibold">
                    ₦1,804.50
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => {}}
                    className="text-[#555555] border-[1px] border-[#E7E7E7] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                  >
                    28 Feb 23 – 10 Mar 23 <CaretDown />
                  </button>
                </div>
              </div>
              <table className="w-full">
                <>
                  <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      <span className="flex items-center gap-x-1">
                        <span>Assets</span>
                        <span>
                          <CaretDown size={14} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">Cash</td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">Receivables</td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                  </tr>
                  <tr className="">
                    <td className="px-3.5 py-3 text-left"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                </>
                <>
                  <tr className="border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      Total Assets
                    </td>
                    <td className="px-3.5 py-3 text-right">₦1,804.50</td>
                  </tr>
                </>
              </table>
            </div>
            <div className="w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
              <Button className="w-[124px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]">
                Download
              </Button>
              <Button className="w-[166px]" onClick={() => {}}>
                Back to dashboard
              </Button>
            </div>
          </div>
        </Portal>
      )}
      {more === "revenue" && (
        <Portal onClose={() => setMore("")}>
          <div className="w-[466px] bg-white rounded-[16px] flex flex-col">
            <div className="h-[60px] px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
              Revenue details
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-[#4C5259] text-[14px] leading-[20px] font-medium">
                    Total Revenue Inflow
                  </div>
                  <div className="text-[#04050F] text-[24px] leading-[35px] font-semibold">
                    ₦1,804.50
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => {}}
                    className="text-[#555555] border-[1px] border-[#E7E7E7] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                  >
                    28 Feb 23 – 10 Mar 23 <CaretDown />
                  </button>
                </div>
              </div>
              <table className="w-full">
                <>
                  <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      <span className="flex items-center gap-x-1">
                        <span>Assets</span>
                        <span>
                          <CaretDown size={14} />
                        </span>
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">Cash</td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#E7E7E7] text-[14px] leading-[16px] text-[#4C5259]">
                    <td className="px-3.5 py-3 text-left">Receivables</td>
                    <td className="px-3.5 py-3 text-right">10,545.64</td>
                  </tr>
                  <tr className="">
                    <td className="px-3.5 py-3 text-left"></td>
                    <td className="px-3.5 py-3 text-right"></td>
                  </tr>
                </>
                <>
                  <tr className="border-t-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left font-bold text-[12px] leading-[16px] text-[#021645]">
                      Total Assets
                    </td>
                    <td className="px-3.5 py-3 text-right">₦1,804.50</td>
                  </tr>
                </>
              </table>
            </div>
            <div className="w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
              <Button className="w-[124px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]">
                Download
              </Button>
              <Button className="w-[166px]" onClick={() => {}}>
                Back to dashboard
              </Button>
            </div>
          </div>
        </Portal>
      )}
      {more === "runway duration" && (
        <Portal onClose={() => setMore("")}>
          <div className="w-[734px] bg-white rounded-[16px] flex flex-col">
            <div className="h-[60px] px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
              Runway Duration
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-[#4C5259] text-[14px] leading-[20px] font-medium">
                    Current Runway Duration
                  </div>
                  <div className="text-[#04050F] text-[24px] leading-[35px] font-semibold">
                    10 months
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => {}}
                    className="text-[#555555] border-[1px] border-[#E7E7E7] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
                  >
                    28 Feb 23 – 10 Mar 23 <CaretDown />
                  </button>
                </div>
              </div>
              <table className="w-full">
                <>
                  <tr className="bg-[#F8F9FE] border-t-[1px] border-[#8083AC]">
                    <th className="px-3.5 py-3 text-left">MONTH</th>
                    <th className="px-3.5 py-3 text-left">OPENING BAL.</th>
                    <th className="px-3.5 py-3 text-left">Expenses</th>
                    <th className="px-3.5 py-3 text-left">Closing BAl.</th>
                    <th className="px-3.5 py-3 text-left">RUNWAY</th>
                  </tr>
                  <tr className="border-b-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left">April</td>
                    <td className="px-3.5 py-3 text-left">₦1,804,000.50</td>
                    <td className="px-3.5 py-3 text-left">₦1,804,000.50</td>
                    <td className="px-3.5 py-3 text-left">₦1,804,000.50</td>
                    <td className="px-3.5 py-3 text-left">10 months</td>
                  </tr>
                  <tr className="border-b-[1px] border-[#8083AC]">
                    <td className="px-3.5 py-3 text-left">April</td>
                    <td className="px-3.5 py-3 text-left">₦1,804,000.50</td>
                    <td className="px-3.5 py-3 text-left">₦1,804,000.50</td>
                    <td className="px-3.5 py-3 text-left">₦1,804,000.50</td>
                    <td className="px-3.5 py-3 text-left">10 months</td>
                  </tr>
                </>
              </table>
            </div>
            <div className="w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
              <Button className="w-[124px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]">
                Download
              </Button>
              <Button className="w-[166px]" onClick={() => {}}>
                Back to dashboard
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

const Page = () => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedChart, setSelectedChart] = useState<any>(null);
  const [showStatements, setShowStatements] = useState(false);
  const [activeStatement, setActiveStatement] = useState("overview");
  // const [trialBalance, setTrialBalance] = useState<any>(null);
  const [trialBalanceBreakdown, setTrialBalanceBreakdown] = useState<any>(null);
  const [statements, setStatements] = useState(null);
    const [linkBanks, setLinkBanks] = useState(false);



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
  },[])

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
    console.log(res?.data);
    if (res?.data?.extractFinancialStatement?.code) {
      console.log(res?.data?.extractFinancialStatement?.code);
    } else if (res?.data?.extractFinancialStatement?.data) {
      console.log(res?.data?.extractFinancialStatement?.data["2022"]);
      setShowStatements(true);
      setStatements(res?.data?.extractFinancialStatement?.data["2022"]);
      // setTrialBalanceBreakdown(res?.data?.extractFinancialStatement?.data?.results);
    }
  }, [res]);

  const onSubmit = (data: any) => {
    console.log(data);
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

  console.log(trialBalance);
  // console.log(trialBalanceBreakdown);

 if (loading )
   return (
     <div className="h-full flex items-center justify-center">
       <BeatLoader />
     </div>
   );

  return (
    <>
      {!trialBalance && !loading ? (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-[28px] leading-[41px] text-[#060809]">
              Accounting
            </h3>
            <p className="text-[#4C5259] text-[16px] leading-[23px]">
              Kindly contact your account manager to access your financial
              statement
            </p>
          </div>
          {/* <Button className="border-[2px] border-[#00085A] bg-white text-[#00085A] w-[156px]">
            Link a new bank
          </Button> */}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-[28px] leading-[41px] text-[#060809]">
                Accounting
              </h3>
              <p className="text-[#4C5259] text-[16px] leading-[23px]">
                Track your financial data and manage your company{"s"} financial
                health
              </p>
            </div>
              <Button className="border-[2px] border-[#00085A] bg-white text-[#00085A] w-[156px]"
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
            <div className="mt-8 grid grid-cols-[1fr,auto] gap-x-6">
              <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
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
                <div className="p-6">
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
                                        {account_type?.debit}
                                      </td>
                                      <td className="px-3.5 py-3 text-right">
                                        {account_type?.credit}
                                      </td>
                                    </tr>
                                  );
                                })}
                                <tr className="border-b-[1px] border-[#E7E7E7] font-bold text-[14px] leading-[16px] text-[#021645]">
                                  <td className="px-3.5 py-3 text-left">
                                    Total {element}
                                  </td>
                                  <td className="px-3.5 py-3 text-right">
                                    {debit}
                                  </td>
                                  <td className="px-3.5 py-3 text-right">
                                    {credit}
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
                          {trialBalance?.debit}
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          {trialBalance?.credit}
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