import { Form } from "react-bootstrap";

export default function InputField({ label, hint, error, icon, ...props }) {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props?.id}>
          {icon && <i className={icon}></i>} {label}{" "}
          {hint && <span className="hint">{hint}</span>}
        </label>
      )}

      <Form.Control isInvalid={!!error} {...props} className={props.id === "phone" ? "phone" : ""} />

      {props.id === "phone" && <span className="phone_code">+966</span>}

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
