import { sanityClient } from "./clients/sanity";
import { pagesQuery } from "./queries";
import { Page } from "./types";

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
    };
  },
};
