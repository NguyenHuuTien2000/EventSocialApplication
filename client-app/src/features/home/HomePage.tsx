import { Link } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default observer(function HomePage() {
  const {userStore, modalStore} = useStore()

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h1" inverted>
              <Image size="massive" src="/assets/Type_Imaginary.png" alt="logo" id="home-page-logo"/>
              Event Social App
            </Header>
            <Header as="h3" inverted>Helps you find and join exciting activities with people in your life.</Header>
            <br/>
            <Image centered size="large" src="/assets/Events3.jpg" />
          </Grid.Column>
          <Grid.Column width={6} id="login-buttons">
            {userStore.isLoggedIn ? (
              <Fragment>
                <Header as="h2"inverted content={`Welcome back, ${userStore!.user!.displayName}!`} />
                <Button as={Link} to="/activities" size="huge" inverted>Go to Events Dashboard</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted fluid>
                  Login
                </Button>
                <br />
                <Button
                  as={FacebookLogin}
                  appId="1070700277233121"
                  size="huge"
                  inverted
                  fluid
                  color="facebook"
                  content="Login with Facebook"
                  loading={userStore.fbLoading}
                  onSuccess={(response : any) => {
                    userStore.facebookLogin(response.accessToken)
                  }}
                  onFail={(response : any) => {
                    console.log("Login failed: ", response)
                  }}/>
                <Divider horizontal inverted>Or</Divider>
                <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted >
                  Create a new account
                </Button>
              </Fragment> 
            )}
          </Grid.Column>
        </Grid >
      </Container>
    </Segment>
  );
})
