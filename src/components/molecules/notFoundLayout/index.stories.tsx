import NotFoundLayout from ".";

export default {
  title: "molecules/NotFoundLayout",
  component: NotFoundLayout,
};

export const Default = {
  args: {
    title: "404",
    description: "Sorry, we couldn’t find the page you were looking for.",
    customButton: {
      title: "Back to Home",
      onClick: () => null,
    },
  },
};
