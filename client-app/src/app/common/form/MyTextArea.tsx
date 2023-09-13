import { useField } from "formik"
import { Form } from "semantic-ui-react"

interface Props {
    placeholder: string
    name: string
    rows?: number
    label?: string
}


export default function MyTextArea(props : Props) {
    const [field, meta] = useField(props.name)

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props}/>
            {meta.touched && meta.error ? (
                <p className="error-message">
                    {meta.error}
                </p>
            ): null}
        </Form.Field>
    )

}