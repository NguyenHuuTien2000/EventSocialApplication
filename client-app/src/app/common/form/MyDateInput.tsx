import { useField } from "formik"
import { Form } from "semantic-ui-react"
import DatePicker, { ReactDatePickerProps } from "react-datepicker"

export default function MyDateInput(props : Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!)

    return (
        <Form.Field error={meta.touched && (!!meta.error)}>
            <DatePicker
             {...field} 
             {...props} 
             selected={(field.value && (new Date(field.value) || null))}
             onChange={(date : Date) => helpers.setValue(date)} />
            {meta.touched && meta.error ? (
                <p className="error-message">
                    {meta.error}
                </p>
            ): null}
        </Form.Field>
    )

}