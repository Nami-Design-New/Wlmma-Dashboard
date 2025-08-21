import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({ label, error, setValue, ...props }) {
  const handlePhoneChange = (value, data) => {
    const countryIso = data?.countryCode?.toUpperCase();
    const phoneCode = `+${data?.dialCode}`;

    const whatsapp = value.startsWith(data.dialCode)
      ? value.slice(data.dialCode.length)
      : value;

    setValue("whatsapp", whatsapp);
    setValue("phone_code", phoneCode);
    setValue("country_iso", countryIso);
  };

  return (
    <div className="form_field w-100">
      {label && <label htmlFor={props?.id}>{label}</label>}
      <PhoneInput
        {...props}
        country={"sa"}
        enableSearch={true}
        onChange={handlePhoneChange}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
