"use client";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { INVOICE_DETAILS } from "@/graphql/queries";
import { useSearchParams } from "next/navigation";
import BeatLoader from "react-spinners/BeatLoader";
import Button from "@/components/buttons/Button";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    window.location.href = "/404";
  }

  const { loading, data, error } = useQuery(INVOICE_DETAILS, {
    variables: {
      input: {
        invoiceId: id,
      },
    },
  });
  const invoice = data?.invoice?.data;
  console.log(data);
  console.log(error);

  //@ts-ignore
  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-78c32a8b72a024530811d57ff2768e5a-X",
    tx_ref: "Accountable-1687650943124-8278266",
    amount: invoice?.amount,
    currency: invoice?.currency,
    payment_options: "card",
    customer: {
      email: invoice?.initiator.email,
      phone_number: '',
      name: invoice?.initiator.firstName + " " + invoice?.initiator.lastName,
    },

    // customizations: {
    //   title: "my Payment Title",
    //   description: "Payment for items in cart",
    //   logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    // },
  });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <BeatLoader />
      </div>
    );
  }

  return (
    <div
      className="mt-4 md:w-[97%] lg:w-[41vw] mx-auto"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <div className=" flex justify-between w-[97%] mx-auto  bg-[#F2F5F9] mt-[8px] xl:mt-[0.55vw] px-[1.1vw] py-[2.2vw]">
        <div>
          <h1 className="font-bold text-[20px] xl:text-[1.38vw] ">Invoice</h1>
          <p className=" text-[10px] xl:text-[0.69vw] font-[400] mt-[0.97vw]">
            Billed to:
          </p>
          <p className="text-[14px] xl:text-[0.97vw] text-[#04050F] font-semibold">
            {invoice?.initiator?.firstName} {invoice?.initiator?.lastName}
          </p>

          <p className="text-[10px] xl:text-[0.69vw] font-[500] text-[#04050F]">
            {invoice?.initiator?.email}
          </p>
        </div>

        <div className="sm:text-right">
          <p className=" text-[10px] xl:text-[0.69vw]">Invoice Number</p>
          <h1 className="font-bold text-[14px] xl:text-[0.97vw] text-[#04050F]">
            {invoice?.number}
          </h1>
          <p className="text-[10px] xl:text-[0.67vw] font-[400] text-[#4C5259] mt-[0.97vw]">
            Issued on
          </p>
          <p className="mb-[12px] text-[#04050F] text-[10px] xl:text-[0.67vw] font-[500]">
            {formatDateToYYYYMMDD(invoice?.createdAt)}
          </p>
        </div>
      </div>

      <div
        className=" text-[10px] rounded-[3px] xl:rounded-[0.2vw] xl:text-[0.7vw] mt-[24px] xl:mt-[1.7vw] w-[90%] mx-auto"
        style={{ border: "1px solid #DFE4EA" }}
      >
        <div className="flex justify-between border-b font-semibold px-[9px] xl:px-[0.62vw] py-[12px] xl:py-[0.83vw]">
          <h1 className="w-[33%]">Name</h1>
          <h1 className="w-[7%] text-center ">Unit</h1>
          <h1 className="w-[18%] text-center">Recurring</h1>
          <h1 className="w-[18%] text-end">Amount</h1>
        </div>
        {invoice?.items?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex justify-between border-b px-[9px] xl:px-[0.62vw] py-[12px] xl:py-[0.83vw]"
            >
              <h1 className="w-[33%] ">{item.name}</h1>
              <h1 className="w-[7%] text-center">{item.occurrence}</h1>
              <h1 className="w-[18%] text-center">
                {item.recurring ? "Yes" : "No"}
              </h1>
              <h1 className="w-[18%] text-end">
                {formatWithCommas(item.price)}
              </h1>
            </div>
          );
        })}
      </div>
      <div className="flex w-[90%] mx-auto mt-[24px] xl:mt-[1.67vw] items-center">
        <div className="border-t-[2px] rounded-sm  w-[60%]"></div>
        <div className="flex justify-between items-center w-[40%] bg-[#F2F5F9] px-[20px] xl:px-[1.38vw] py-[12px] xl:py-[0.83vw] rounded-[12px] xl:rounded-[0.8vw]">
          <p className="text-[10px] xl:text-[0.7vw]">
            Total ( {invoice?.currency} )
          </p>
          <span className="font-bold text-[16px] xl:text-[1.1vw]">
            {formatWithCommas(invoice?.amount)}
          </span>
        </div>
      </div>

      <div className=" bg-[#F9F9FA] mt-[45px] text-[#04050F] flex flex-col xl:mt-[3.1vw] px-[30px] py-[16px] xl:px-[2.08vw] xl:py-[1.1vw]">
        <div className="flex justify-between mt-[12px] xl:mt-[0.83vw]">
          <div className="w-[30%]">
            <Image
              alt="logo dashboard"
              src="/logomain.svg"
              height={25}
              width={25}
            />
            <h1 className="font-bold text-[14px] xl:text-[0.87vw]">
              Accountable TechServe
            </h1>
            <p className="mt-[8px] xl:mt-[0.55vw] text-[10px] xl:text-[0.7vw]">
              56,Admiralty Rd,Lekki Lagos.
            </p>
            <p className="text-[#071A7E] mt-[8px] xl:mt-[0.55vw] text-[10px] xl:text-[0.7vw]">
              Product@accountable.com
            </p>
          </div>
          <div className="w-[30%] text-[10px] xl:text-[0.7vw]">
            <p className="font-semibold">Payment Details</p>
            <>
              <p className="mt-[8px] xl:mt-[0.55vw] font-[400]">
                Recurring: {invoice?.recurring ? "Yes" : "No"}
              </p>
              <p className="mt-[8px] xl:mt-[0.55vw] font-[400]">
                Paid: {invoice?.paid ? "Yes" : "No"}
              </p>
              <p className="text-[12px] xl:text-[0.83vw] border-b border-gray-500 font-normal mt-[8px] xl:mt-[0.55vw] mb-3 "></p>
              <Button onClick={() => {
                handleFlutterPayment({
                  callback: (response: any) => {
                    console.log(response);
                    closePaymentModal();
                  
                  },
                  onClose: () => {
                    closePaymentModal();
                  }
                  
                });
              }}>Pay Now</Button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;

const formatWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 

const formatDateToYYYYMMDD = (date: string) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  return [year, month, day].join("-");
}
