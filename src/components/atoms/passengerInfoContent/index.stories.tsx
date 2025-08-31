import PassangerInfoContent from ".";

export default {
  title: "atoms/PassangerInfoContent",
  component: PassangerInfoContent,
};

export const Default = {
  args: {
    title: "Passenger 1",
    firstNameTitle: "First Name",
    lastNameTitle: "Last Name",
    emailTitle: "Email",
    phoneTitle: "Phone",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Smith",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+1234567890",
  },
};
