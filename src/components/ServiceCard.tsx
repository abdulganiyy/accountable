import React, { FC, ReactNode } from "react";
import { CaretCircleRight, CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  icon: ReactNode;
  name: string;
  price: string;
  description: string;
  subscription: boolean;
  frequency: string;
  currency: string;
  setChooseService: (val: any) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({
  icon,
  name,
  price,
  description,
  subscription,
  frequency,
  currency,
  setChooseService,
}) => {
  const router = useRouter();
  return (
    <div className="py-4 px-3 h-[74px] rounded-[16px] border-[1px] border-[#E6E6E6E5] flex items-center justify-between">
      <div className="flex items-center justify-center gap-x-4">
        <span className="w-[40px] h-[40px] flex rounded-full items-center justify-center bg-[#FEF3F2]">
          {icon}
        </span>
        <div>
          <div className="text-[#021645] text-[16px] leading-[23px] font-medium">
            {name}
          </div>
          <div className="text-[#414141] text-[12px] leading-[17.4px]">
            {subscription
              ? `Monthly Subscription ${currency}${price}`
              : `Custom Pricing`}
          </div>
        </div>
      </div>
      {!subscription ? (
        <button
          onClick={() => {
            router.push("/dashboard/messages");
          }}
          className="border-[#7D839866] border-[1px] text-[#414141] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px]"
        >
          Contact Manager
        </button>
      ) : (
        <button
          onClick={() => {
            setChooseService(true);
          }}
          className="bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px]"
        >
          Purchase
        </button>
      )}

      {/* <div className="w-[24px] h-[24px] flex rounded-full items-center justify-center border-[1px] border-[#00000014]">
        <CaretRight color="#4C5259" size={7} />
      </div> */}
    </div>
  );
};

export default ServiceCard;
