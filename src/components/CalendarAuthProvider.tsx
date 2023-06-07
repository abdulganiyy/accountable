"use client";

import { SessionProvider } from "next-auth/react";

const CalendarAuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default CalendarAuthProvider;
