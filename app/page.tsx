"use client"

import Image from "next/image";
import Timer from "@/app/components/timer";
import { useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<number>(30);


  return (
    <>
      <Timer timeLeft={timeLeft} />
    </>
  );
}
