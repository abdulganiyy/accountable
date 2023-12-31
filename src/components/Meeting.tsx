import React, { FC, useEffect, useState } from "react";
import { PencilSimple, Trash, X } from "@phosphor-icons/react";
import Link from "next/link";
import { truncateStr } from "@/utils";
import { Portal } from "@/components/Portal";
import MeetingScheduler from "@/components/MeetingScheduler";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./buttons/Button";
import DatePicker from "./inputs/DatePicker";
import TimePicker from "./inputs/TimePicker";
import TextInput from "./inputs/TextInput";
import { useMutation } from "@apollo/client";
import { DELETE_MEETING, RESCHEDULE_MEETING } from "@/graphql/mutations";
import { ToastContainer, toast } from "react-toastify";

const schema = yup.object({
  date: yup.string().required(),
  time: yup.string().required(),
});
interface MeetingProps {
  details?: any;
  link?: string;
  update: () => void;
}

const Meeting: FC<MeetingProps> = ({ details, link,update }) => {
  const [open, setOpen] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  console.log("details", details);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [rescheduleMeeting, result] = useMutation(RESCHEDULE_MEETING, {
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
    onCompleted: (data) => {
      toast.success(data.rescheduleMeeting.message);
      setReschedule(false);
      // refetch meetings
      update();
    }
  });

  const [deleteMeeting, res] = useMutation(DELETE_MEETING, {
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
    onCompleted: (data) => {
      toast.success(data.deleteMeeting.message);
      // refetch meetings
      update();
    }
  });

  // useEffect(() => {
  //   // console.log(result.data);

  //   if (result.data?.rescheduleMeeting?.code) {
  //     toast.error(result.data?.rescheduleMeeting?.code);
  //   } else if (result.data?.rescheduleMeeting?.message) {
  //     toast.success(result.data?.rescheduleMeeting?.message);
  //   }
  // }, [result.data]);

  // useEffect(() => {
  //   // console.log(res.data);

  //   if (res.data?.deleteMeeting?.code) {
  //     toast.error(res.data?.deleteMeeting?.code);
  //   } else if (res.data?.deleteMeeting?.message) {
  //     toast.success(res.data?.deleteMeeting?.message);
  //   }
  // }, [res.data]);

  const onSubmit = async (data: any) => {
    // console.log(details?.id);
    // console.log(`${data?.date}T${data?.time}`);

    rescheduleMeeting({
      variables: {
        input: {
          date: new Date(`${data?.date}T${data?.time}`),
          meetingId: details?.id,
        },
      },
    });
  };

  const startDatetime = new Date(details?.start?.dateTime);
  const endDatetime = new Date(details?.end?.dateTime);

  // Format the time in 12-hour format
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const startFormatted = new Intl.DateTimeFormat("en-US", options).format(
    startDatetime
  );
  const endFormatted = new Intl.DateTimeFormat("en-US", options).format(
    endDatetime
  );

  return (
    <div className="relative z-0 w-full">
      <div
        onClick={() => setOpen(!open)}
        className={`relative z-0 h-[18px] px-[9px] rounded-[12px] bg-[#BAE2F8] text-[10px] leading-[18px] cursor-pointer w-full`}
      >
        {truncateStr(details?.summary, 17) || "Sync with Bimbo"}
      </div>
      {open && (
        <div
          className="box-shadow: 0px 12px 24px 0px #00000012
        absolute bg-white top-full left-0 z-50 w-[254px] rounded-[16px] px-6 pt-4 pb-8 flex flex-col gap-y-6 border-[1px] border-[#E0E0E080]"
        >
          <div className="flex text-[24px] text-[#606367] items-center gap-x-4">
            <span
              className="cursor-pointer"
              // href={`${link}`}
              // target="_blank"
              // rel="noopener noreferrer"
              onClick={() => setReschedule(true)}
            >
              <PencilSimple />
            </span>
            <span
              className="cursor-pointer"
              // href={`${link}`}
              // target="_blank"
              // rel="noopener noreferrer"
              onClick={() => {
                deleteMeeting({
                  variables: {
                    input: {
                      meetingId: details?.id,
                    },
                  },
                });
              }}
            >
              <Trash />
            </span>
            <span
              onClick={() => setOpen(false)}
              className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ECEDED]"
            >
              <X />
            </span>
          </div>
          <div className={`pl-4 border-l-[8px] border-[#BAE2F8] flex flex-col`}>
            <span className="text-[22px] leading-[33px] font-medium">
              {truncateStr(details?.summary, 25) || "Sync with Bimbo"}
            </span>
            <span className="text-[#555555]">
              {new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
                new Date(details?.start?.dateTime)
              )}
            </span>
            <span className="text-[#555555]">
              {`${startFormatted} - ${endFormatted}`}
              {/* {new Date(details?.start?.dateTime).getHours()} -
              {new Date(details?.end?.dateTime).getHours()}{" "}
              {new Date(details?.end?.dateTime).toLocaleTimeString().slice(-2)} */}
            </span>
          </div>
          <div>
            <a
              className="h-[48px] w-full rounded-md flex items-center justify-center bg-[#071A7E] text-white"
              href={`${details?.hangoutLink}`}
              target="_blank"
              rel="noopener noreferrer"
            > 
              Join Meeting
            </a>
          </div>
        </div>
      )}
      {openMeeting && (
        <Portal
          onClose={() => {
            setOpenMeeting(false);
          }}
        >
          <MeetingScheduler onCancel={() => {}} onSubmitCallback={() => {}} />
        </Portal>
      )}
      {reschedule && (
        <Portal
          onClose={() => {
            setReschedule(false);
          }}
        >
          <div className="w-[546px] bg-white rounded-[16px]">
            <div className="px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
              Schedule Meeting
              <p className="text-[14px] leading-[20px] text-[#4C5259]">
                This is an instant meeting with your account manager
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 py-4">
                <div className="flex flex-col gap-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <DatePicker
                      label="Select date"
                      placeholder=""
                      register={register}
                      name="date"
                      errorMessage={errors?.date?.message}
                    />
                    <TimePicker
                      label="Select time"
                      placeholder=""
                      register={register}
                      name="time"
                      errorMessage={errors?.time?.message}
                    />
                  </div>
                  {/* <TextInput
                    label="Add note"
                    placeholder="Please share anything that will help prepare for the meeting"
                    register={register}
                    name="note"
                  /> */}
                </div>
                <div className="flex justify-end gap-x-2 mt-5">
                  <Button
                    onClick={() => {
                      setReschedule(false);
                    }}
                    type="button"
                    className="w-[95px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-[196px]"
                    disabled={!isValid || isSubmitting}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Reschedule Meeting
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Portal>
      )}
      <ToastContainer />
    </div>
  );
};

export default Meeting;
