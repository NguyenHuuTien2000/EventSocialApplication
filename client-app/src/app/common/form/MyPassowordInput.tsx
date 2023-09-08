import { useField } from "formik"
import { useState } from "react"
import { Form, Icon, Label } from "semantic-ui-react"

interface Props {
    placeholder: string
    name: string
    label?: string
}

export default function MyPasswordInput(props : Props) {
    const [field, meta] = useField(props.name)
    const [passwordShown, setPasswordShown] = useState(false)

    function handleShowPassword() {
        setPasswordShown(!passwordShown)
    }

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} type={passwordShown ? "text" : "password"}/>
            <Icon className="password-icon" onClick={() => handleShowPassword()} name={passwordShown ? "eye slash" : "eye"} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}