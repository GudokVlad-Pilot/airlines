import PaymentBox from ".";

export default {
  title: "atoms/PaymentBox",
  component: PaymentBox,
};

export const Default = {
  args: {
    title: "Payment",
    codePlaceholder: "Gift Code",
    codeButtonTitle: "Apply",
    isCodeButtonDisabled: false,
  },
};

export const Disabled = {
  args: {
    title: "Payment",
    codePlaceholder: "Gift Code",
    codeButtonTitle: "Apply",
    isCodeButtonDisabled: true,
  },
};

export const Loading = {
  args: {
    title: "Payment",
    codePlaceholder: "Gift Code",
    codeButtonTitle: "Apply",
    isCodeButtonDisabled: false,
    isCodeButtonLoading: true,
  },
};
