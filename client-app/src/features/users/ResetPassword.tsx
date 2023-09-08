import { Segment, Header, Icon, Form, Button, Label, Message } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import useQuery from "../../app/util/hooks"
import * as Yup from "yup"
import { ErrorMessage, Formik } from "formik"
import MyTextInput from "../../app/common/form/MyTextInput"
import SuccessModal from "../../app/common/modals/SuccessModal"

export default function ResetPassword() {
    const {userStore, modalStore} = useStore()
    const email = useQuery().get("email") as string
    const token = useQuery().get("token") as string

    return (
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name="key" />
          Password Reset
        </Header>
        <Segment.Inline className="password-segment">
          <Formik
            initialValues={{token: token, email: email, password: '', error: null}}
            onSubmit={(values, { setErrors }) => 
              userStore.resetPassword(values).then(() => 
              modalStore.openModal(<SuccessModal message="Password reset" />))
              .catch(error => setErrors({error}))}
            validationSchema={Yup.object({
              password: Yup.string().required().equals([Yup.ref("confirm-password")], "Passwords must match")
            })}
            >
              {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit}>
                  <MyTextInput name="password" placeholder="New Password" type="password"/>
                  <MyTextInput name="confirm-password" placeholder="Confirm New Password" type="password" />
                  <ErrorMessage
                    name="error" render={() => 
                    <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />} />
                  <Button loading={isSubmitting} color="purple" content="Reset" type="submit" fluid />
                  <Message 
                  info 
                  content="Password must contain at least 5-10 characters, 1 uppercase, 1 lowercase and 1 number" />
                </Form>
              )}
          </Formik>
        </Segment.Inline>
      </Segment>
      )

}