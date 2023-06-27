import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/Type_Imaginary.png" alt="logo" id="home-page-logo"/>
          Event Social App
        </Header>
        <Header as="h2"inverted content="Welcome to E.S.A" />
        <Button as={Link} to="/login" size="huge" inverted>
          Login
        </Button>
      </Container>
    </Segment>
  );
}
