import { Form } from "react-bootstrap";

export default function SelectField({
  label,
  hint,
  options,
  error,
  icon,
  defaultSelect,
  ...props
}) {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props?.id}>
          {icon && <i className={icon}></i>} {label}{" "}
          {hint && <span className="hint">{hint}</span>}
        </label>
      )}

      <Form.Select isInvalid={!!props?.error} {...props}>
        <option value="" disabled>
          {defaultSelect}
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </Form.Select>

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
