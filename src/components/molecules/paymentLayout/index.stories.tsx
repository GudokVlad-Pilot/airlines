import PaymentInfo from ".";

export default {
  title: "molecules/PaymentInfo",
  component: PaymentInfo,
};

export const Default = {
  args: {
    paymentBox: {
      title: "Payment",
      codePlaceholder: "Gift Code",
      codeButtonTitle: "Apply",
      isCodeButtonDisabled: false,
    },
    orderPlaceholder: "Order Number",
    orderId: "123",
    totalPlaceholder: "Total",
    total: "100$",
    paymentButtonText: "Pay Now",
    isPaymentButtonLoading: false,
    isPaymentButtonDisabled: false,
  },
};
