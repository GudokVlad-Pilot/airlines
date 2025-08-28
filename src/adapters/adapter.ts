import { sanityClient } from "./clients/sanity";
import {
  airportsQuery,
  dictionaryQuery,
  pagesQuery,
  routesQuery,
  staticRouteQuery,
} from "./queries";
import { Airport, Dictionary, Page, Route, StaticRoute } from "./types";

export const adapters = {
  cms: () => {
    return {
      getPages: async (): Promise<Page[]> => {
        try {
          const result = (await sanityClient.fetch(pagesQuery)) as Page[];
          console.log(result);
          console.log("I am getPages from Sanity");
          return result;
        } catch (error) {
          console.error("Failed to fetch pages:", error);
          return [];
        }
      },
      getDictionary: async (): Promise<Dictionary[]> => {
        try {
          const result = (await sanityClient.fetch(
            dictionaryQuery,
          )) as Dictionary[];
          console.log(result);
          console.log("I am getDictionary from Sanity");
          return result;
        } catch (error) {
          console.error("Failed to fetch dictionary:", error);
          return [];
        }
      },
      getAirports: async (): Promise<Airport[]> => {
        try {
          const result = (await sanityClient.fetch(airportsQuery)) as Airport[];
          console.log(result);
          console.log("I am getAirports from Sanity");
          return result;
        } catch (error) {
          console.error("Failed to fetch airports:", error);
          return [];
        }
      },
      getRoutes: async (): Promise<Route[]> => {
        try {
          const result = (await sanityClient.fetch(routesQuery)) as Route[];
          console.log(result);
          console.log("I am getRoutes from Sanity");
          return result;
        } catch (error) {
          console.error("Failed to fetch routes:", error);
          return [];
        }
      },
      getStaticRoutes: async (): Promise<StaticRoute[]> => {
        try {
          const result = (await sanityClient.fetch(
            staticRouteQuery,
          )) as StaticRoute[];
          console.log(result);
          console.log("I am getStaticRoutes from Sanity");
          return result;
        } catch (error) {
          console.error("Failed to fetch Static Routes:", error);
          return [];
        }
      },
    };
  },
};
