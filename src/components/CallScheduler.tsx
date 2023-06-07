import React, { FC, useState, useEffect } from "react";
import { Portal } from "./Portal";
// import TextInput from "./inputs/TextInput";
// import CardDetailsInput from "./inputs/CardDetailsInput";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { WarningCircle } from "@phosphor-icons/react";
import Button from "./buttons/Button";
import Success from "./layouts/Success";
// import DatePicker from "./inputs/DatePicker";
// import TimePicker from "./inputs/TimePicker";
// import { ADD_CARD } from "@/graphql/mutations";
// import { useMutation } from "@apollo/client";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import timezone from "city-timezones";
// import { apiCalendar } from "@/utils";
import MeetingScheduler from "./MeetingScheduler";
// import { GET_ACCOUNT_MANAGER } from "@/graphql/queries";
// import { useQuery } from "@apollo/client";
// import { BeatLoader } from "react-spinners";
import GoogleCalendarButton from "./GoogleCalendarButton";

async function eventWithVideoConference() {
  try {
    // e.preventDefault();
    // await apiCalendar.createEventWithVideoConference(
    //   {
    //     summary: "Meet your Accountable account manager",
    //     // this is the 'add note' field as indicate on the accountable UI
    //     description:
    //       "Let's talk about your financial goals and how we can help you achieve them",
    //     attendees: [
    //       { email: "ganiyy@accountable.global" },
    //       { email: "devabdulganiyy@gmail.com" },
    //     ],
    //     reminders: {
    //       useDefault: true,
    //     },
    //     start: {
    //       dateTime: new Date(new Date().getTime() + 360000).toISOString(),
    //       timeZone: timezone.lookupViaCity("Lagos")[0].timezone,
    //     },
    //     end: {
    //       dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
    //       timeZone: timezone.lookupViaCity("Lagos")[0].timezone,
    //     },
    //   },
    //   "primary",
    //   "all" // send notifications to all attendees
    // );
    alert("Event created successfully");
  } catch (error) {
    alert("Could not create event with video conference");
  }
}

interface CallSchedulerProps {
  onClose: () => void;
  successHandler: () => void;
}

// const schema = yup.object({
//   cardName: yup.string().required(),
//   cardDetails: yup.string().required(),
//   expiryDate: yup.string().required(),
//   cvv: yup.string().email().required(),
// });

const CallScheduler: FC<CallSchedulerProps> = ({ onClose, successHandler }) => {
  const [linkCard, setLinkCard] = useState(false);
  const [linkCardSuccess, setLinkCardSuccess] = useState(false);
  const [scheduleCall, setScheduleCall] = useState(true);
  const [scheduleCallSuccess, setScheduleCallSuccess] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [link, setLink] = useState("");

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm();

  // const [addCard, result] = useMutation(ADD_CARD);

  let user;

  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    user = JSON.parse(storedUser);
  }

  // useEffect(() => {
  //   if (result?.data?.addCard?.message) {
  //     console.log(result?.data?.addCard?.data);
  //     setConfig(result?.data?.addCard?.data?.payment?.initialConfig);
  //   }
  // }, [result?.data?.addCard]);

  // useEffect(() => {
  //   addCard();
  // }, [addCard]);

  //@ts-ignore
  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-78c32a8b72a024530811d57ff2768e5a-X",
    tx_ref: "Accountable-1687650943124-8278266",
    amount: 1,
    currency: "NGN",
    payment_options: "card",
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

  // const { loading, data, error } = useQuery(GET_ACCOUNT_MANAGER, {
  //   variables: { input: { month: 8, year: 2023 } },
  // });

  // useEffect(() => {
  //   console.log(data);
  //   if (data?.getAccountManagerCalendar?.code) {
  //     console.log(data?.getAccountManagerCalendar?.code);
  //   } else if (data?.getAccountManagerCalendar?.data) {
  //     setLink(data?.getAccountManagerCalendar?.data?.link);
  //   }
  // }, [data]);

  return (
    <>
      <Portal onClose={onClose}>
        {linkCard && (
          <div className="w-[371px] h-[308px] bg-white rounded-[16px] overflow-hidden">
            <div className="px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
              Make a commitment
            </div>
            <div className="h-full">
              <div className="p-6 text-[14px] leading-[20px] flex flex-col gap-y-4 text-[#414141]">
                <p>
                  We want to assure you that we only require your payment
                  details for account verification.
                </p>
                <p>
                  Rest assured,{" "}
                  <span className="text-[#00085A]">no charges</span> will be
                  applied at this stage.
                </p>
              </div>
              <div className="bg-[#F2F3F7] h-full flex justify-end gap-x-2 mt-5 px-6 pt-4">
                <Button
                  onClick={() => {
                    setLinkCard(false);
                    onClose();
                  }}
                  className="w-[95px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                >
                  Cancel
                </Button>
                <Button
                  className="w-[156px]"
                  onClick={() => {
                    handleFlutterPayment({
                      callback: (response) => {
                        console.log(response);
                        closePaymentModal();
                        setLinkCard(false);
                        setLinkCardSuccess(true);
                      },
                      onClose: () => {
                        closePaymentModal();
                        setLinkCard(true);
                        setLinkCardSuccess(false);
                      },
                    });
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
        {linkCardSuccess && (
          <Success
            clickHandler={() => {
              close();
              setLinkCardSuccess(false);
              setScheduleCall(true);
            }}
          />
          // <GoogleCalendarButton />
        )}
        {scheduleCall && (
          <Portal
            onClose={() => {
              setScheduleCall(false);
              setScheduleCallSuccess(true);
            }}
          >
            <MeetingScheduler
            // onCancel={() => {
            //   setScheduleCall(false);
            //   onClose();
            // }}
            // onSubmitCallback={() => {
            //   setScheduleCall(false);
            //   setScheduleCallSuccess(true);
            // }}
            />
          </Portal>
        )}

        {scheduleCallSuccess && (
          <Portal
            onClose={() => {
              setScheduleCall(false);
              setScheduleCallSuccess(false);
              onClose();
            }}
          >
            <Success
              clickHandler={() => {
                setScheduleCallSuccess(false);
                onClose();
                successHandler();
              }}
              headerText="Invite Sent"
              bodyText="You have successfully scheduled a call with your account manager."
              footerText="Continue to next step"
            />
          </Portal>
        )}
      </Portal>
    </>
  );
};

export default CallScheduler;
