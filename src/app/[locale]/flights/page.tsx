"use client";

import { Suspense } from "react";
import FlightsContent from "./flightsContent";

export default function FlightsPage() {
  return (
    <Suspense fallback={<div>Loading flights...</div>}>
      <FlightsContent />
    </Suspense>
  );
}
