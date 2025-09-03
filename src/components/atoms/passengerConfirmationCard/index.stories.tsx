import PassengerConfirmationCard from ".";

export default {
  title: "atoms/PassengerConfirmationCard",
  component: PassengerConfirmationCard,
};

export const Default = {
  args: {
    title: "Passenger 1",
    firstNamePlaceholder: "First Name",
    lastNamePlaceholder: "Last Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone",
    firstName: "John",
    lastName: "Doe",
    email: "example@email.com",
    phone: "+1234567890",
  },
};
