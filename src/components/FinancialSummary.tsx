import React, { useEffect, useState } from "react";
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


const FinancialSummary = ({summary}:{summary:any}) => {

  console.log(summary);

  return (
    <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl mt-8">
      <div className="h-[68px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
        Financial Summary
      </div>
      <div className="p-6">
        <div className="grid grid-cols-[290px,1fr] gap-6">
          <div className="border-[1px] border-[#E6E6E6] rounded-[16px] py-8 px-6">
            <div className="flex flex-col gap-y-3 pb-12 border-b-[1px] border-[#E6E6E6] mb-12">
              <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                <Money size={20} />
              </span>
              <span className="font-medium text-[14px] leading-[20px] text-[#4C5259]">
                All Cash and Assets
              </span>
              <span className="font-semibold text-[24px] leading-[29px] text-[#021645]">
                ₦{summary?.all_cash_and_assets || " XXX"}
              </span>
              <span className="text-[14px] leading-[20px] text-[#414141]">
                Total sum of your cash and assets
              </span>
            </div>
            <div>
              <span className="font-semibold text-[12px] leading-[17px] text-[#021645]">
                Cash & Assets Breakdown
              </span>
              <div className="text-[12px] leading-[17.4px] w-full mt-4 flex flex-col gap-2 pb-3 mb-3 border-b-[1px] border-[#E6E6E6]">
                <div className="flex justify-between">
                  <span className="pr-2 text-[12px] leading-[17px] text-[#414141]">
                    All Assets
                  </span>
                  <span className="pr-2 font-medium text-[12px] leading-[17px] text-[#414141]">
                    ₦{summary?.all_assets || " XXX"}
                    {/* || "26,000,680.06" */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="pr-2 text-[12px] leading-[17px] text-[#414141]">
                    Cash in bank
                  </span>
                  <span className="pr-2 font-medium text-[12px] leading-[17px] text-[#414141]">
                    ₦{summary?.cash_in_bank || " XXX"}
                    {/* || "26,000,680.06" */}
                  </span>
                </div>
              </div>
              <div className="text-[12px] leading-[17.4px] flex justify-between">
                <span className="pr-2 text-[12px] leading-[17px] text-[#060809]">
                  Total sum
                </span>
                <span className="pr-2 font-semibold text-[12px] leading-[17px] text-[#021645]">
                  ₦{`${summary?.all_assets + summary?.cash_in_bank || " XXX"}`}
                  {/* "20,000,680.06" */}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
              <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
                <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                  <PokerChip size={20} />
                </span>
                <span className="font-medium text-[14px] leading-[20px] text-[#4C5259]">
                  All Assets
                </span>
                <span className="font-semibold text-[24px] leading-[29px] text-[#021645]">
                  ₦{summary?.all_assets || " XXX"}
                  {/* || "20,000,680.06" */}
                </span>
                <span className="text-[14px] leading-[20px] text-[#414141]">
                  Total assets in financials
                </span>
              </div>
            </div>
            <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
              <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
                <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                  <Bank size={20} />
                </span>
                <span className="font-medium text-[14px] leading-[20px] text-[#4C5259]">
                  Cash in bank
                </span>
                <span className="font-semibold text-[24px] leading-[29px] text-[#021645]">
                  ₦{summary?.cash_in_bank || " XXX"}
                  {/* || "6,000,680.06" */}
                </span>
                <span className="text-[14px] leading-[20px] text-[#414141]">
                  Total cash in banks • 24 banks connected
                </span>
              </div>
            </div>{" "}
            <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
              <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
                <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                  <Scales size={20} />
                </span>
                <span className="font-medium text-[14px] leading-[20px] text-[#4C5259]">
                  Liabilities
                </span>
                <span className="font-semibold text-[24px] leading-[29px] text-[#021645]">
                  ₦{summary?.liabilities || " XXX"}
                  {/* || "6,000,680.06" */}
                </span>
                <span className="text-[14px] leading-[20px] text-[#414141]">
                  Total sum of liabilities in financials
                </span>
              </div>
            </div>{" "}
            <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
              <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
                <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                  <Rocket size={20} />
                </span>
                <span className="font-medium text-[14px] leading-[20px] text-[#4C5259]">
                  Runway duration
                </span>
                <span className="font-semibold text-[24px] leading-[29px] text-[#021645]">
                  {summary?.runway_duration || " XXX"} months
                  {/* || "10" */}
                </span>
                <span className="text-[14px] leading-[20px] text-[#414141]">
                  Total sum of cash / Operational costs
                </span>
              </div>
            </div>
            {/* <div className="border-[1px] border-[#E6E6E6] rounded-[16px] py-8 px-6 flex flex-col gap-y-3">
        <span className="bg-[#F2F3F7] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
          <PokerChip size={20} />
        </span>
        <span>All Assets</span>
        <span>₦20,000,680</span>
        <span>Total assets in financials</span>
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
