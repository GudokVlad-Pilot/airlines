"use client";

import { useSearchParams } from "next/navigation";

export default function FlightsPage() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";

  return (
    <div>
      <h1>Flights</h1>
      <p>From: {from}</p>
      <p>To: {to}</p>
      <p>Start date: {start}</p>
      {end && <p>End date: {end}</p>}
    </div>
  );
}
