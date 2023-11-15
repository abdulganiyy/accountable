"use client";
import React, { FC, useState, useEffect } from "react";
import { Portal } from "./Portal";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PlusCircle, Check, ChartLineUp } from "@phosphor-icons/react";
import Button from "./buttons/Button";
import Image from "next/image";
import { DevTool } from "@hookform/devtools";
import Select from "./inputs/Select";
import TextArea from "./inputs/TextArea";
import RadioInputTwo from "./inputs/RadioInputTwo";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { PURCHASE_SERVICE } from "@/graphql/mutations";
import { CARDS, VERIFY_TRANSACTIONS } from "@/graphql/queries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import SelectTwo from "./inputs/SelectTwo";

interface ServicePickerProps {
  onClose: () => void;
  services: any[];
  pickedServices: any[];
  setPickedServices: React.Dispatch<React.SetStateAction<any>>;
}

const schema = yup.object({
  note: yup.string(),
  service: yup.string().required("Value is mendatory"),
});

const ServicePicker: FC<ServicePickerProps> = ({ onClose, services,pickedServices,setPickedServices }) => {
  const [addService, setAddService] = useState(true);
  const [addPayment, setAddPayment] = useState(false);
  const [addCardSuccess, setAddCardSuccess] = useState(false);
  const [addServiceSuccess, setAddServiceSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [paymentCard, setPaymentCard] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [duration, setDuration] = useState<any>(1);
  const [cards, setCards] = useState<any>(null);
  const [addNew, setAddNew] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    // defaultValues: {
    //   note: "",
    //   service: "",
    //   duration: [{ service: "", duration: "" }],
    // },
    resolver: yupResolver(schema),
  });

  let user;

  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    user = JSON.parse(storedUser);
  }

  //@ts-ignore
  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-78c32a8b72a024530811d57ff2768e5a-X",
    tx_ref: "Accountable-1687650943124-8278266",
    amount: 1,
    currency: "NGN",
    payment_options: 'card',
    customer: {
      email: user?.email,
      phone_number: user?.phone,
      name: user?.name,
    },

    // customizations: {
    //   title: "my Payment Title",
    //   description: "Payment for items in cart",
    //   logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    // },
  });

  const [verifyTransactions, resp] = useLazyQuery(VERIFY_TRANSACTIONS);

  useEffect(() => {
    if (resp?.data?.verifyTx?.code) {
      console.log(resp?.data?.verifyTx?.code);
    } else if (resp?.data?.verifyTx?.data) {
      console.log(resp?.data?.verifyTx?.data);
      // setCards([...cards, resp?.data?.verifyTx?.data]);
    }
  }, [resp]);

  useEffect(() => {
    if (paymentCard === "new") {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          closePaymentModal();
          // verifyTransactions({
          //   variables: {
          //     input: {
          //       "transaction_id": "",
          //       "tx_ref": ""
          //     },
          //   },
          // });
          // setAddService(false)
          setAddPayment(false);
          setPaymentCard("");
          setAddCardSuccess(true);
        },
        onClose: () => {
          closePaymentModal();
          setAddPayment(true);
          setPaymentCard("");
        },
      });
    }

    return () => {};
  }, [paymentCard, handleFlutterPayment]);

  const onSubmit = async (data: any) => {
    setAddNew(true);
    // console.log(data);
    // const pickedservice = services.find(
    //   (service) => service.name === data.service
    // );
    // console.log(pickedservice);

    // if (
    //   pickedServices.find((service: any) => pickedservice.name === service.name)
    // ) {
    //   return;
    // }

    // setPickedServices([...pickedServices, pickedservice]);
    // setAddService(false);
    // setAddPayment(true);
  };

  const updatePickedServices = (service: { value: string ,key:string}) => {
    console.log("service is", service);

      const pickedservice = services.find(
        (item) => item.name === service.value
      );
    console.log(pickedservice);
    if (!pickedservice) {
      return
    }

      if (
        pickedServices.find(
          (service: any) => pickedservice?.name === service.name
        )
      ) {
        return;
      }
    setPickedServices([...pickedServices, pickedservice]);
    setAddNew(false);
    // setAddPayment(true);
  }

  const onChangePayment = (e: any) => {
    const name = e.target.name;

    if (name === "old") {
      setPaymentCard("old");
    } else {
      setPaymentCard("new");
    }
  };

  const result = useQuery(CARDS);

  useEffect(() => {
    if (result.data?.cards?.code) {
      //
      toast.error(result.data?.cards?.message);
    } else if (result.data?.cards?.data) {
      console.log(result.data?.cards?.data);
      setCards(result.data?.cards?.data);
    }
  }, [result.data]);

  // const router = useRouter();

  const [purchaseService, res] = useMutation(PURCHASE_SERVICE);

  useEffect(() => {
    if (res.data?.purchaseService?.code) {
      //
      toast.error(res.data?.purchaseService?.message);
    } else if (res.data?.purchaseService?.data) {
      console.log(res.data?.purchaseService?.data);
      setAddPayment(false);
      setAddServiceSuccess(true);
    }
  }, [res.data]);

  return (
    <Portal onClose={onClose}>
      {addService && (
        <div className="w-[466px] bg-white rounded-[16px] flex flex-col">
          <div className="h-[60px] px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
            Purchase a service
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-6 py-4 h-[436px] overflow-y-auto">
              <div className="flex flex-col gap-y-4 w-full">
                {pickedServices.map((item: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="py-4 px-3 h-[74px] rounded-[16px] border-[1px] border-[#E6E6E6E5] flex items-center justify-between"
                    >
                      <div className="flex items-center justify-center gap-x-4">
                        <span className="w-[40px] h-[40px] flex rounded-full items-center justify-center bg-[#FEF3F2]">
                          <ChartLineUp size={20} />
                        </span>
                        <div>
                          <div className="text-[#021645] text-[16px] leading-[23px] font-medium">
                            {item?.name}
                          </div>
                          <div className="text-[#414141] text-[12px] leading-[17.4px]">
                            {item?.currency}
                            {item?.price}
                          </div>
                        </div>
                      </div>
                      <span
                        onClick={() => {
                          setPickedServices(
                            pickedServices.filter(
                              (i: any) => i.name !== item.name
                            )
                          );
                        }}
                        className="cursor-pointer text-[#B42318] text-[12px] leading-[17.4px] font-medium"
                      >
                        Remove
                      </span>
                    </div>
                  );
                })}
                {
                 ( addNew || pickedServices.length === 0 )  &&
                  <div className="flex flex-col gap-y-4 w-full">
                    <Select
                      label="What service are you purchasing"
                      placeholder="Select a service"
                      name={`service`}
                      register={register}
                      setValue={setValue}
                      options={services.map((item: any) => ({
                        value: item?.name,
                        key: item?.name,
                      }))}
                      callBack={updatePickedServices}
                    />
                  </div>
                }
                {/* <div className="flex flex-col gap-y-4 w-full">
                  <Select
                    label="What service are you purchasing"
                    placeholder="Select a service"
                    name={`service`}
                    register={register}
                    setValue={setValue}
                    options={services.map((item: any) => ({
                      value: item?.name,
                      key: item?.name,
                    }))}
                    callBack={() => {
                    
                  }}
                  />
                </div> */}
                <div>
                  <TextArea
                    label="Add note"
                    name="note"
                    placeholder="Please write about your expected outcome for the service(s) selected * work on copy"
                    register={register}
                  />
                </div>
                {/* <div
                  onClick={() => {
                    append({ service: "", duration: "" });
                  }}
                  className="flex gap-x-2 cursor-pointer"
                >
                  <span className="bg-[#F2F3F7] w-[24px] h-[24px] rounded-[8px] text-black p-1 cursor-pointer">
                    <PlusCircle size={16} />
                  </span>
                  <span>Add another service</span>
                </div> */}
              </div>
            </div>
            <div className="w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
              <Button
                type="button"
                className="w-[207px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                onClick={()=>setAddNew(true)}
              >
                Add another service
              </Button>
              <Button
                type="button"
                className="w-[176px]"
                disabled={!pickedServices.length}
                onClick={() => {
                  if (pickedServices.length) {
                    setAddService(false);
                    setAddPayment(true);
                  }
                }}
              >
                Continue to payment
              </Button>
            </div>
          </form>
        </div>
      )}
      {addPayment && (
        <div className="bg-white w-[517px] rounded-[16px] flex flex-col">
          <div className="h-[60px] px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
            Make Payment
          </div>
          <div className="p-6 h-[436px] overflow-y-auto">
            <div className="flex flex-col gap-y-6">
              <div>
                <h3 className="font-bold	text-[14px] leading-[20px]">
                  Select Payment method
                </h3>
                <div className="flex flex-col gap-y-2 mt-4">
                  {cards.length !== 0 &&
                    cards?.map((card: any, i: number) => {
                      return (
                        <RadioInputTwo
                          key={i}
                          id={card?.id}
                          label={`${card?.first6digits.slice(0, 4)} **** **** ${
                            card?.last4digits
                          }`}
                          value={card?.id}
                          onChange={(e) => setSelectedCard(e.target.value)}
                          checked={selectedCard == card?.id}
                        />
                      );
                    })}
                  {/* <RadioInputTwo
                    id="old"
                    name="old"
                    label="2345 **** **** 345"
                    value="old"
                    onChange={onChangePayment}
                    checked={paymentCard == "old"}
                  /> */}
                  <RadioInputTwo
                    id="new"
                    name="new"
                    label="Add a new card"
                    value={paymentCard}
                    onChange={onChangePayment}
                    checked={paymentCard == "new"}
                  />
                  {/* <div className="flex gap-x-[10px] items-center">
                    <input
                      type="radio"
                      name="paymentCard"
                      checked={paymentCard === "old"}
                      className="hidden peer w-3 h-3 border-[.5px] border-[#00085A] bg-white checked:bg-[#00085A] checked:border-[3px]"
                    />
                    <span className="w-3 h-3 border-[.5px] border-[#00085A] rounded-full peer-checked:border-[3px] shadow-sm inline-block"></span>
                    <span>2345 **** **** 345</span>
                  </div>
                  <div className="flex gap-x-[10px] items-center">
                    <input
                      type="radio"
                      name="paymentCard"
                      checked={paymentCard === "new"}
                      className="hidden peer w-3 h-3 border-[.5px] border-[#00085A] bg-white checked:bg-[#00085A] checked:border-[3px]"
                    />
                    <span className="w-3 h-3 border-[.5px] border-[#00085A] rounded-full peer-checked:border-[3px] shadow-sm inline-block"></span>
                    <span>Add a new card</span>
                  </div> */}
                </div>
                {/* {paymentCard} */}
              </div>
              <SelectTwo
                label="How many months are you subscribing for"
                placeholder="Select duration"
                name={`duration`}
                register={register}
                setValue={setDuration}
                options={[
                  { key: "1 month", value: 1 },
                  { key: "2 months", value: 2 },
                  { key: "3 months", value: 3 },
                  { key: "4 months", value: 4 },
                  { key: "5 months", value: 5 },
                  { key: "6 months", value: 6 },
                  { key: "7 months", value: 7 },
                  { key: "8 months", value: 8 },
                  { key: "9 months", value: 9 },
                  { key: "10 months", value: 10 },
                ]}
              />
              <div>
                <h3 className="font-bold	text-[14px] leading-[20px]">
                  Order Summary
                </h3>
                <div className="flex flex-col gap-y-4 mt-4">
                  {/* <div className="flex justify-between items-center">
                    <span className="text-[#4C5259]">
                      Catchup Accounting x 3 months
                    </span>
                    <span className="font-medium text-[12px] leading-[17.4px]">
                      ₦ 26,000,680
                    </span>
                  </div> */}
                  {pickedServices.map((item: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <span className="text-[#4C5259]">
                          {item?.name || `Catchup Accounting`} x {duration || 1}{" "}
                          months
                        </span>
                        <span className="font-medium text-[12px] leading-[17.4px]">
                          ₦ {item?.price}
                        </span>
                      </div>
                    );
                  })}
                  <div className="h-[1px] bg-[#EAEDEF]"></div>
                  <div className="flex justify-between text-[12px] leading-[17.4px]">
                    <span className="font-semibold">Total payment</span>
                    {/* 26,000,680.06 */}
                    <span className="font-bold">
                      ₦{" "}
                      {pickedServices.reduce(
                        (acc: number, item: any) => (acc += item?.price),
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="recurring"
                  className="flex gap-x-[10px] items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="recurring"
                    id="recurring"
                    checked={recurring ? true : false}
                    onChange={(e: any) => setRecurring(!recurring)}
                    className="hidden peer w-3 h-3 border-[.5px] border-[#00085A] bg-white checked:bg-[#00085A] checked:border-[3px]"
                  />
                  <span className="w-[15px] h-[15px] border-[.5px] border-[#00085A] peer-checked:border-[2px] shadow-sm flex items-center justify-center rounded-sm">
                    {recurring === true ? <Check size={8} /> : null}
                  </span>
                  <span>Make a recurring payment</span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
            <Button
              type="button"
              onClick={() => {
                setAddService(true);
                setAddPayment(false);
              }}
              className="w-[95px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-[164px]"
              isLoading={res.loading}
              disabled={!duration || selectedCard === ""}
              onClick={() => {
                // console.log(
                //   recurring,
                //   JSON.stringify(pickedServices.map((s: any) => s?.id)),
                //   duration,
                //   selectedCard
                // );
                purchaseService({
                  variables: {
                    input: {
                      card: selectedCard,
                      duration,
                      recurring,
                      services: pickedServices.map((s: any) => s?.id),
                    },
                  },
                });
                // setAddPayment(false);
                // setAddServiceSuccess(true);
              }}
            >
              Make payments
            </Button>
          </div>
        </div>
      )}
      {addCardSuccess && (
        <div className="bg-white h-[388px] w-[517px] rounded-[16px]">
          <div className="flex flex-col pt-[65px] gap-y-4 items-center h-full">
            <Image src="/verify-icon.svg" alt="Logo" width={72} height={72} />
            <div className="mt-[32px] text-[#060809] font-medium text-[20px] leading-[28px]">
              Card Added Successfully
            </div>
            <div className="max-w-[278px] mb-4 text-center text-[#04050F] font-normal text-[16px] leading-[24px]">
              Your card has been successfully saved to your account
            </div>
            <div className="flex gap-x-2">
              {/* <Button
                type="button"
                className="w-[175px]  bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
              >
                See your services
              </Button> */}
              <Button
                type="button"
                className="w-[175px]"
                onClick={() => {
                  setAddCardSuccess(false);
                  setAddPayment(true);

                  // onClose();
                }}
              >
                Continue
              </Button>
            </div>
          </div>
          {/* <DevTool control={control} /> */}
        </div>
      )}
      {addServiceSuccess && (
        <div className="bg-white h-[388px] w-[517px] rounded-[16px]">
          <div className="flex flex-col pt-[65px] gap-y-4 items-center h-full">
            <Image src="/verify-icon.svg" alt="Logo" width={72} height={72} />
            <div className="mt-[32px] text-[#060809] font-medium text-[20px] leading-[28px]">
              Payment completed
            </div>
            <div className="max-w-[278px] mb-4 text-center text-[#04050F] font-normal text-[16px] leading-[24px]">
              You have successfully subscribed to our services
            </div>
            <div className="flex gap-x-2">
              {/* <Button
                type="button"
                className="w-[175px]  bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
              >
                See your services
              </Button> */}
              <Button
                type="button"
                className="w-[175px]"
                onClick={() => {
                  setAddServiceSuccess(false);
                  onClose();
                }}
              >
                See your services
              </Button>
            </div>
          </div>
          {/* <DevTool control={control} /> */}
        </div>
      )}
      <ToastContainer />
    </Portal>
  );
};

export default ServicePicker;
