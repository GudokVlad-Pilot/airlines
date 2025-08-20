import { sanityClient } from "./clients/sanity";
import { airportsQuery, dictionaryQuery, pagesQuery } from "./queries";
import { Airport, Dictionary, Page } from "./types";

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
    };
  },
};
