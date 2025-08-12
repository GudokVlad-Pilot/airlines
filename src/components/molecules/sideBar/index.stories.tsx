import SideBar from ".";

export default {
  title: "molecules/SideBar",
  component: SideBar,
};

const pages = [
  {
    title: "News",
    onClick: () => alert("News clicked"),
  },
  {
    title: "About us",
    onClick: () => alert("About us clicked"),
  },
  {
    title: "Fleet",
    onClick: () => alert("Fleet clicked"),
  },
  {
    title: "Destinations",
    onClick: () => alert("Destinations clicked"),
    // use this if at some point you get tired of alerts:
    // onClick: () => null,
  },
];

export const Default = {
  args: { pages: pages },
};

export const CustomTheme = {
  args: {
    pages: pages,
    basicColor: "#000000",
    backgroundColor: "#FF02EE",
  },
};
