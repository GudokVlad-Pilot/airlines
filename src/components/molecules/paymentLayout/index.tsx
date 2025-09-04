import "./paymentInfo.css";
import CustomButton from "@/components/atoms/customButton";
import PaymentBox, { PaymentBoxProps } from "@/components/atoms/paymentBox";

type Props = {
  paymentBox: PaymentBoxProps;
  orderPlaceholder: string;
  orderId: string;
  totalPlaceholder: string;
  total: string;
  paymentButtonText: string;
  onPaymentButtonClick: () => void;
  isPaymentButtonDisabled: boolean;
  isPaymentButtonLoading: boolean;
};

export default function PaymentInfo({
  paymentBox,
  orderPlaceholder,
  orderId,
  totalPlaceholder,
  total,
  paymentButtonText,
  onPaymentButtonClick,
  isPaymentButtonLoading,
  isPaymentButtonDisabled,
}: Props) {
  return (
    <div className="paymentInfoBox">
      <div className="paymentInfoHeader">
        <div className="paymentInfoTitleBox">
          <div className="paymentInfoTitle">{orderPlaceholder}:&nbsp;</div>
          <div className="paymentInfoSubtitle">{orderId}</div>
        </div>
        <div className="paymentInfoTitleBox">
          <div className="paymentInfoTitle">{totalPlaceholder}:&nbsp;</div>
          <div className="paymentInfoSubtitle">{total}</div>
        </div>
      </div>

      <div className="paymentInfoContent">
        <PaymentBox {...paymentBox} />
      </div>
      <div className="paymentInfoButtons">
        {/* <CustomButton
          title={addPassangerButtonText}
          onClick={onAddPassangerButtonClick}
        /> */}
        <CustomButton
          title={paymentButtonText}
          onClick={onPaymentButtonClick}
          isDisabled={isPaymentButtonDisabled}
          isLoading={isPaymentButtonLoading}
        />
      </div>
    </div>
  );
}
