"use client";
import { Suspense } from "react";
import PaymentContent from "./paymentContent";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
