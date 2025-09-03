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
    route: "Helsinki(HEL)-Helsinki(HEM)",
    departureTimePlaceholder: "Departure Time",
    departureTime: "17:00",
    arrivalTimePlaceholder: "Arrival Time",
    arrivalTime: "18:30",
    mealPlaceholder: "Meal",
    meal: "Dish 1",
    extrasPlaceholder: "Extras",
    extras: "Loungue, Transfer, Accomodation",
  },
};
