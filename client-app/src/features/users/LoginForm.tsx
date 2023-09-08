import { ErrorMessage, Form, Formik} from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";
import MyPasswordInput from "../../app/common/form/MyPassowordInput";

export default observer(function LoginForm() {
  const {userStore, modalStore} = useStore();

  return (
    <Formik        
      initialValues={{email: '',password: '', error: null}}
      onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
        setErrors({error: error.response.data}))}>

      {({handleSubmit, isSubmitting, errors}) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Login " color="purple" textAlign="center" />
          <MyTextInput name="email" placeholder="Email" />
          <MyPasswordInput name="password" placeholder="Password" />
          <ErrorMessage
            name="error" render={() => 
            <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />} />
          <Button loading={isSubmitting} color="purple" content="Login" type="submit" fluid />
          <br />
          <Button as={Link} to="/account/forgotPassword" onClick={() => modalStore.closeModal()} color="blue">Forgot Password?</Button>
        </Form>
        
      )}
    </Formik>
  )
})