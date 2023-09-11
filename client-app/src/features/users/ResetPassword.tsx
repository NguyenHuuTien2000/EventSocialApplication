import { Segment, Header, Icon, Form, Button, Label, Message } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import useQuery from "../../app/util/hooks"
import * as Yup from "yup"
import { ErrorMessage, Formik } from "formik"
import SuccessModal from "../../app/common/modals/SuccessModal"
import MyPasswordInput from "../../app/common/form/MyPassowordInput"

export default function ResetPassword() {
    const {userStore, modalStore} = useStore()
    const email = useQuery().get("email") as string
    const token = useQuery().get("token") as string

    const message = "Password has been reset, you can now login"

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
              modalStore.openModal(<SuccessModal message={message} />))
              .catch(error => setErrors({error}))}
            validationSchema={Yup.object({
              "confirm-password": Yup.string().required().equals([Yup.ref("password")], "Passwords must match")
            })}
            >
              {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit}>
                  <MyPasswordInput name="password" placeholder="New Password"/>
                  <MyPasswordInput name="confirm-password" placeholder="Confirm New Password"/>
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