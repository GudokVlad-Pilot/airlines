import { useState } from "react";
import PassengerInfo from ".";

export default {
  title: "molecules/PassengerInfo",
  component: PassengerInfo,
};

export const Default = {
  args: {
    title: "Passenger Information",
  },
};

export const Opened = {
  args: {
    title: "Passenger Information",
    isOpened: true,
  },
};

export const Action = {
  render: (args: any) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <PassengerInfo
        {...args}
        isOpened={isOpened}
        onClick={() => setIsOpened((prev) => !prev)}
      />
    );
  },
  args: {
    title: "Passenger Information",
  },
};
