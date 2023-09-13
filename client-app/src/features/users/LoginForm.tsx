import { ErrorMessage, Form, Formik} from "formik";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import MyPasswordInput from "../../app/common/form/MyPassowordInput";
import * as Yup from "yup";

export default observer(function LoginForm() {
  const {userStore, modalStore} = useStore();

  return (
    <Formik        
      initialValues={{email: '',password: '', error: null}}
      onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
        setErrors({error: error.response.data}))}
        validationSchema={Yup.object({
          email: Yup.string().required("Email is required"),
          password: Yup.string().required("Password is required")
        })}>

      {({handleSubmit, isSubmitting, errors}) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Login " color="purple" textAlign="center" />
          <MyTextInput name="email" placeholder="Email" />
          <MyPasswordInput name="password" placeholder="Password" />
          <ErrorMessage
            name="error" render={() => 
            <p className="main-error-message">{errors.error}</p>} />
          <Button loading={isSubmitting} color="purple" content="Login" type="submit" fluid />
          <a href="/account/forgotPassword" onClick={() => modalStore.closeModal()} className="reset-link">Forgot Password?</a>
        </Form>
        
      )}
    </Formik>
  )
})