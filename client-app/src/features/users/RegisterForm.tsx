import { ErrorMessage, Form, Formik} from "formik";
import { Button, Header, Message } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik        
            initialValues={{displayName: '', username: '', email: '',password: '', error: null}}
            onSubmit={(values, { setErrors }) => 
                userStore.register(values).catch(error => setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required().matches(/^[a-zA-Z0-9 ]*$/, "No special characters allowed"),
                username: Yup.string().required().matches(/^[a-zA-Z0-9 ]*$/, "No special characters allowed"),
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}>

            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Sign Up " color="pink" textAlign="center" />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage
                        name="error" render={() => 
                        <ValidationError errors={errors.error}/>} />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        color="pink" 
                        content="Register" 
                        type="submit" 
                        fluid />
                    <Message info content="Password must contain at least 5-10 characters, 1 uppercase, 1 lowercase and 1 number" />
                </Form>
            )}
        </Formik>
    )
})