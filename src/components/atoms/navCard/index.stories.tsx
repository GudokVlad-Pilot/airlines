import NavCard from ".";

export default {
  title: "atoms/NavCard",
  component: NavCard,
};

export const Default = {
  args: {
    title: "Example",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus lorem, tempor a consequat non, varius in quam. Nulla in euismod leo, a egestas magna. Donec ipsum orci, gravida nec erat et, euismod pretium enim. Aliquam blandit erat eu ligula dictum suscipit. Mauris a fermentum mi. Nullam ut ligula nec lectus fermentum hendrerit. Cras ultricies libero vel ultrices pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla quis facilisis tortor. Suspendisse sodales volutpat turpis nec euismod. Maecenas est quam, lacinia ut congue non, viverra eget arcu. Pellentesque ac ipsum molestie ex pretium feugiat. Vestibulum iaculis enim id vestibulum sodales. Sed congue ante purus, eget gravida felis varius vel. Duis at sollicitudin turpis, accumsan hendrerit ante.",
    onClick: () => null,
  },
};

export const News = {
  args: {
    title: "News",
    image: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    onClick: () => null,
  },
};
