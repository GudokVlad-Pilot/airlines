"use client";
import { useParams } from "next/navigation";

export default function FlightPage() {
  const params = useParams();
  const { locale, flight } = params;

  return (
    <div>
      <h1>Flight ID: {flight}</h1>
      <p>Locale: {locale}</p>
    </div>
  );
}
