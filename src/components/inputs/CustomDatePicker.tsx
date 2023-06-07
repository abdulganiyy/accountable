import React, { FC, useState, useEffect } from "react";
import { X, CalendarBlank, CaretDown, CaretUp } from "@phosphor-icons/react";
import moment from "moment";
import { twMerge } from "tailwind-merge";

interface CustomDatePickerProps {
  label?: string;
  name?: string;
  placeholder?: string;
  setValue?: any;
  register?: any;
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  label,
  placeholder,
  name,
  setValue,
  register,
}) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);

  const weekdays = moment.weekdaysShort();
  const weekdaysStartingFromMonday = [...weekdays.slice(1), weekdays[0]]; // Rearrange weekdays to start from Monday

  const renderWeekdays = () => {
    return weekdaysStartingFromMonday.map((weekday) => (
      <div key={weekday} className="text-[#9291A5]">
        {weekday.slice(0, 2)}
      </div>
    ));
  };

  const renderCalendarDays = () => {
    const today = moment().startOf("day");
    const firstDayOfMonth = moment(currentDate).startOf("month").day() - 1;
    const daysInMonth = moment(currentDate).daysInMonth();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = moment(currentDate)
        .startOf("month")
        .subtract(firstDayOfMonth - i, "days");
      days.push(
        <div key={`empty-${i}`} className={`bg-white text-[#9291A5]`}>
          {" "}
          {prevMonthDay.format("D")}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment(currentDate).date(i);
      // console.log(date.format());
      const isToday = date.isSame(moment(), "day");

      // const isWeekend = date.day() === 0 || date.day() === 6;

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => {
            // alert(date.format());
            setSelectedDate(date.format());
            setOpen(false);
          }}
          className={twMerge(`bg-white cursor-pointer`)}
        >
          <span
            className={`text-[14px] leading-[15px] m-1 ${
              isToday
                ? "w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#00085A] text-white"
                : ""
            }`}
          >
            {i}
          </span>
        </div>
      );
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  useEffect(() => {
    setValue(name, `${selectedDate}`, { shouldValidate: true });
    // trigger("phone", {
    //   shouldValidate: true,
    //   shouldTouch: true,
    //   shouldDirty: true,
    // });
  }, [setValue, name, selectedDate]);

  return (
    <div className="flex flex-col gap-y-2 font-normal text-sm">
      <label>{label}</label>
      <div className="relative z-20 w-full ">
        <div
          onClick={() => setOpen(!open)}
          className={`px-3 py-4 rounded-[8px] bg-white border-[1px] border-[#EAEDEF] text-[#A0A0A0] cursor-pointer w-full`}
        >
          {(selectedDate &&
            new Intl.DateTimeFormat(undefined, { dateStyle: "short" }).format(
              new Date(selectedDate)
            )) ||
            placeholder ||
            "dd/mm/yy"}
          <span className="h-[32px] w-[32px] rounded-[8px] bg-[#F2F3F7] flex items-center justify-center absolute top-[12px] right-[8px]">
            <CalendarBlank color="#00085A" size={15} />
          </span>
        </div>
        {open && (
          <div
            className="box-shadow: 0px 12px 24px 0px #00000012
      absolute bg-white top-full left-0 z-50 w-[390px] h-[421px] rounded-[20px] p-[30px] flex flex-col gap-y-6 border-[1px] border-[#E0E0E080]"
          >
            <div className="flex justify-center items-center gap-x-[30px] border-b-[1px] border-[#F2F1FF] pb-5">
              <span>{currentDate.format("MMMM")}</span>
              <CaretUp
                onClick={previousMonth}
                className="cursor-pointer"
                color="#9291A5"
              />
              <span>{currentDate.format("YYYY")}</span>
              <CaretDown
                onClick={nextMonth}
                className="cursor-pointer"
                color="#9291A5"
              />
            </div>
            <div className="grid grid-cols-7 gap-y-[26px]">
              {renderWeekdays()}
              {renderCalendarDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;
