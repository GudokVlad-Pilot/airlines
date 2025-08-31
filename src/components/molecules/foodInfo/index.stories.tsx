import { useState } from "react";
import FoodInfo from ".";

const createPassenger = (index: number) => ({
  title: `Passenger ${index + 1}`,
  firstNameTitle: "First Name",
  lastNameTitle: "Last Name",
  emailTitle: "Email",
  phoneTitle: "Phone",
  firstNameValue: "",
  lastNameValue: "",
  emailValue: "",
  phoneValue: "",
  onFirstNameValueChange: () => {},
  onLastNameValueChange: () => {},
  onEmailValueChange: () => {},
  onPhoneValueChange: () => {},
});

export default {
  title: "molecules/FoodInfo",
  component: FoodInfo,
};

export const Default = {
  args: {
    title: "Food on Board",
  },
};

export const Opened = {
  args: {
    title: "Food on Board",
    isOpened: true,
    passengers: [createPassenger(0)],
    continueWithoutMealText: "Continue without a meal",
    nextButtonText: "Next",
  },
};

export const Action = {
  render: (args: any) => {
    const [isOpened, setIsOpened] = useState(false);
    const [passengers, setPassengers] = useState([createPassenger(0)]);

    const handleAddPassenger = () => {
      setPassengers((prev) => [...prev, createPassenger(prev.length)]);
    };

    return (
      <FoodInfo
        {...args}
        isOpened={isOpened}
        onClick={() => setIsOpened((prev) => !prev)}
        passengers={passengers}
        addPassangerButtonText="+ Add Passenger"
        nextButtonText="Next"
        onAddPassangerButtonClick={handleAddPassenger}
      />
    );
  },
  args: {
    title: "Food on Board",
  },
};

export const ActionNextDisabled = {
  render: (args: any) => {
    const [isOpened, setIsOpened] = useState(false);
    const [passengers, setPassengers] = useState([createPassenger(0)]);

    const handleAddPassenger = () => {
      setPassengers((prev) => [...prev, createPassenger(prev.length)]);
    };

    return (
      <FoodInfo
        {...args}
        isOpened={isOpened}
        onClick={() => setIsOpened(true)}
        passengers={passengers}
        addPassangerButtonText="+ Add Passenger"
        nextButtonText="Next"
        isNextDisabled={true}
        onAddPassangerButtonClick={handleAddPassenger}
      />
    );
  },
  args: {
    title: "Food on Board",
  },
};
