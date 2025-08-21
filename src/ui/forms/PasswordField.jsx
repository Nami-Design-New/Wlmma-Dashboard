import { useState } from "react";
import { Form } from "react-bootstrap";

export default function PasswordField({ label, error, ...props }) {
  const [showPass, setShowPass] = useState(false);
  const handleInputType = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="input-field">
      {label && <label htmlFor={props?.id}>{label}</label>}

      <div className="pass-group">
        <Form.Control
          {...props}
          type={showPass ? "text" : "password"}
          isInvalid={!!error}
        />

        <div className="show-pass" onClick={handleInputType}>
          <i
            className={`fa-regular ${!showPass ? "fa-eye-slash" : "fa-eye"}`}
          />
        </div>
      </div>

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
