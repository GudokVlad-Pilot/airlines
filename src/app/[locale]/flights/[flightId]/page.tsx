"use client";

import { Suspense } from "react";
import FlightIdContent from "./flightIdContent";

export default function FlightIdPage() {
  return (
    <Suspense fallback={<div>Loading flight...</div>}>
      <FlightIdContent />
    </Suspense>
  );
}
