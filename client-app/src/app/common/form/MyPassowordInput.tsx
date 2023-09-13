import { useField } from "formik";
import { useState } from "react";
import { Form, Icon } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

export default function MyPasswordInput(props: Props) {
  const [field, meta] = useField(props.name);
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} type={passwordShown ? "text" : "password"} />
      <Icon
        className={passwordShown ? "password-icon" : "password-icon disabled"}
        onClick={() => setPasswordShown(!passwordShown)}
        name={passwordShown ? "eye slash" : "eye"}
      />
      {meta.touched && meta.error ? (
        <p className="error-message">
          {meta.error}
        </p>
      ) : null}
    </Form.Field>
  );
}
