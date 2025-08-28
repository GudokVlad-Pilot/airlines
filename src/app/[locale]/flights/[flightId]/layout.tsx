import { notFound } from "next/navigation";
import { StaticRoute } from "@/adapters/types";
import { adapters } from "@/adapters/adapter";

const { getStaticRoutes } = adapters.cms();

// const staticRoutes: StaticRoute[] = await getStaticRoutes();
// console.log("I am loop", staticRoutes.length);

export const dynamicParams = false;

export async function generateStaticParams() {
  const staticRoutes: StaticRoute[] = await getStaticRoutes();
  return staticRoutes.flatMap((route) => ({ flightId: route._id }));
}

export default async function FlightsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ flightId: string }>;
}) {
  const { flightId } = await params;
  console.log(flightId);

  //   if (!staticRoutes.find((route) => route._id === flightId)) {
  //     notFound();
  //   }

  return <section>{children}</section>;
}
