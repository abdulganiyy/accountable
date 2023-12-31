import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/contexts/AuthContext";
import CalendarAuthProvider from "@/components/CalendarAuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

// console.log(inter);

const migraFont = localFont({
  src: "../../public/._Migra-Extralight.woff2",
  variable: "--migra-font",
});

export const metadata = {
  title: "Accountable",
  description: "Seamless accounting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans ${migraFont.variable}`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
        <ToastContainer />
        <div id="portal" />
      </body>
    </html>
  );
}
