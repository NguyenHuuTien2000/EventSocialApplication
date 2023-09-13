import { useField } from "formik"
import { Form } from "semantic-ui-react"

interface Props {
    placeholder: string
    name: string
    label?: string
    type?: string
}

export default function MyTextInput(props : Props) {
    const [field, meta] = useField(props.name)

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <p className="error-message">
                    {meta.error}
                </p>
            ): null}
        </Form.Field>
    )
}