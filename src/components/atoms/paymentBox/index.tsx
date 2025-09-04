import CustomButton from "../customButton";
import "./paymentBox.css";

export type PaymentBoxProps = {
  title: string;
  codePlaceholder: string;
  codeValue: string;
  onCodeValueChange: (value: string) => void;
  codeButtonTitle: string;
  onCodeButtonClick: () => void;
  isCodeButtonDisabled: boolean;
  isCodeButtonLoading: boolean;
};

export default function PaymentBox({
  title,
  codePlaceholder,
  codeValue,
  onCodeValueChange,
  codeButtonTitle,
  onCodeButtonClick,
  isCodeButtonDisabled,
  isCodeButtonLoading,
}: PaymentBoxProps) {
  return (
    <div className="paymentBoxBox">
      <div className="paymentBoxTitle">{title}</div>
      <div className="paymentBoxRadioGroup">
        <label>
          <input
            type="radio"
            className="paymentMethod"
            value="paypal"
            disabled
          />
          PayPal
        </label>
        <label>
          <input type="radio" className="paymentMethod" value="card" disabled />
          Card
        </label>
        <label>
          <input
            type="radio"
            className="paymentMethod"
            value="mobilepay"
            disabled
          />
          MobilePay
        </label>
        <label>
          <input
            type="radio"
            className="paymentMethod"
            value="giftcard"
            checked
            readOnly
          />
          GiftCard
        </label>
      </div>
      <div className="paymentBoxCodeRow">
        <input
          className="paymentBoxCodeInput"
          type="text"
          placeholder={codePlaceholder}
          value={codeValue}
          onChange={(e) => onCodeValueChange(e.target.value)}
        />
        <CustomButton
          title={codeButtonTitle}
          onClick={onCodeButtonClick}
          isDisabled={isCodeButtonDisabled}
          isLoading={isCodeButtonLoading}
        />
      </div>
    </div>
  );
}
