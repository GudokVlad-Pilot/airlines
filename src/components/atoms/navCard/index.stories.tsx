import NavCard from ".";

export default {
  title: "atoms/NavCard",
  component: NavCard,
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const imageWidth = "w=100"; // TODO: Change width to the size of the card and document it somewhere

export const Default = {
  args: {
    title: "Example",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus lorem, tempor a consequat non, varius in quam. Nulla in euismod leo, a egestas magna. Donec ipsum orci, gravida nec erat et, euismod pretium enim. Aliquam blandit erat eu ligula dictum suscipit. Mauris a fermentum mi. Nullam ut ligula nec lectus fermentum hendrerit. Cras ultricies libero vel ultrices pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla quis facilisis tortor. Suspendisse sodales volutpat turpis nec euismod. Maecenas est quam, lacinia ut congue non, viverra eget arcu. Pellentesque ac ipsum molestie ex pretium feugiat. Vestibulum iaculis enim id vestibulum sodales. Sed congue ante purus, eget gravida felis varius vel. Duis at sollicitudin turpis, accumsan hendrerit ante.",
    onClick: () => console.log("I am Example"),
  },
};

export const Flights = {
  args: {
    title: "Flights",
    image: `https://cdn.sanity.io/images/${projectId}/${dataset}/0c0fc003bc4efef0ebb2d5a347764f11ee37dee9-2560x1920.jpg?${imageWidth}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    onClick: () => console.log("I am Flights"),
  },
};
