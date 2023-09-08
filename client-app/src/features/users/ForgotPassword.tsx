import { Header, Button, Form, Label, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from "yup";
import SuccessModal from "../../app/common/modals/SuccessModal";

export default function ForgotPassword() {
  const {userStore, modalStore} = useStore()
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="user" />
        User Search
      </Header>
      <Segment.Inline className="password-segment">
        <Formik
          validationSchema={Yup.object({
            email: Yup.string().required().email()
          })}
          initialValues={{email: '', error: null}}
          onSubmit={(values, {setErrors}) => 
          userStore.sendPasswordResetEmail(values.email).then(() => 
          modalStore.openModal(<SuccessModal message="Password reset email sent" />)).catch(error => 
            setErrors({error: error.response.data}))}
          >
            {({handleSubmit, isSubmitting, errors}) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
              <Header as="h2" content="Please enter your email for password reset link" color="blue" textAlign="center" />
              <MyTextInput name="email" placeholder="Email"/>
              <ErrorMessage
                name="error" render={() => 
                <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />} />
              <Button loading={isSubmitting} color="blue" content="Send" type="submit" fluid />
            </Form>
          )}
        </Formik>
      </Segment.Inline>
    </Segment>
    
  )
}