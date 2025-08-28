"use client";
import { useParams } from "next/navigation";

export default function FlightIdPage() {
  const params = useParams();
  const { locale, flightId } = params;

  return (
    <div>
      <h1>Flight ID: {flightId}</h1>
      <p>Locale: {locale}</p>
    </div>
  );
}
