"use client";
import React from "react";
import Navbar from "@/components/landingpage/navbar";
import Hero from "@/components/landingpage/heroe";
import WhyUs from "@/components/landingpage/whyUs";
import WhoWeHaveBuiltFor from "@/components/landingpage/whoWeHaveBuiltFor";
import Benefits from "@/components/landingpage/benefits";
import WhatCustomersAreSaying from "@/components/landingpage/whatCustomersAreSaying";
import Partners from "@/components/landingpage/partners";
import Footer from "@/components/landingpage/footer";

function page() {
  return (
    <div className="box-border overflow-hidden">
      <Navbar />
      <Hero />
      <WhyUs />
      <WhoWeHaveBuiltFor />
      <Benefits />
      <WhatCustomersAreSaying />
      <Partners />
      <Footer />
    </div>
  );
}

export default page;
