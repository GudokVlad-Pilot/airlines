import { useState } from "react";
import PassengerInfo from ".";

const passengerInfo = {
  title: "Passenger 1",
  firstNameTitle: "First Name",
  lastNameTitle: "Last Name",
  emailTitle: "Email",
  phoneTitle: "Phone",
  firstNamePlaceholder: "John",
  lastNamePlaceholder: "Smith",
  emailPlaceholder: "example@email.com",
  phonePlaceholder: "+1234567890",
};

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
    passengerInfoData: passengerInfo,
    addPassangerButtonText: "+ Add Passanger",
    nextButtonText: "Next",
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
        passengerInfoData={passengerInfo}
        addPassangerButtonText="+ Add Passanger"
        nextButtonText="Next"
      />
    );
  },
  args: {
    title: "Passenger Information",
  },
};

export const ActionNextDisabled = {
  render: (args: any) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <PassengerInfo
        {...args}
        isOpened={isOpened}
        onClick={() => setIsOpened((prev) => !prev)}
        passengerInfoData={passengerInfo}
        addPassangerButtonText="+ Add Passenger"
        nextButtonText="Next"
        isNextDisabled={true}
      />
    );
  },
  args: {
    title: "Passenger Information",
  },
};
