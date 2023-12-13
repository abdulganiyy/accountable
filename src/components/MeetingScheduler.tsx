import React, { FC, useState, useEffect } from "react";
import { GET_ACCOUNT_MANAGER } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { BeatLoader } from "react-spinners";
import moment from "moment";

interface MeetingSchedulerProps {
  onSubmitCallback?: () => void;
  onCancel?: () => void;
}

const MeetingScheduler: FC<MeetingSchedulerProps> = ({
  onSubmitCallback,
  onCancel,
}) => {
  const [device, setDevice] = useState(getDeviceType(window.innerWidth));
  const [link, setLink] = useState("");
  const [currentDate, setCurrentDate] = useState(moment());

  const { loading, data } = useQuery(GET_ACCOUNT_MANAGER, {
    variables: {
      input: { month: currentDate.month(), year: currentDate.year() },
    },
  });

  useEffect(() => {
    if (data?.getAccountManagerCalendar?.code) {
      console.log(data.getAccountManagerCalendar.code);
    } else if (data?.getAccountManagerCalendar?.data?.link) {
      console.log(data.getAccountManagerCalendar.data.link);
      setLink(data.getAccountManagerCalendar.data.link);
    }
  }, [data, currentDate.month(), currentDate.year()]);

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType(window.innerWidth));
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <BeatLoader />;

  return (
    <iframe
      src={link}
      style={{
        border: 0,
        background: "white",
        width: getWidth(device),
        height: getHeight(device),
      }}
      title="calendar"
    ></iframe>
  );
};

const getDeviceType = (width: number): string => {
  if (width < 768) return "mobile";
  if (width < 1024) return "mini-tablet";
  if (width < 1280) return "pro-tablet";
  return "desktop";
};

const getWidth = (device: string): string => {
  return device === "mobile"
    ? "100%"
    : device === "desktop"
    ? "1000px"
    : "500px";
};

const getHeight = (device: string): string => {
  return device === "mobile"
    ? "600px"
    : device === "desktop"
    ? "600px"
    : "500px";
};

export default MeetingScheduler;



  // useEffect(() => {
  //   const closeIframe = () => {
  //     // onSubmitCallback();
  //     console.log("closing");
  //   };

  //   window.addEventListener("beforeunload", closeIframe);

  //   return () => {
  //     window.removeEventListener("beforeunload", closeIframe);
  //   };
  // }, [onSubmitCallback]);
