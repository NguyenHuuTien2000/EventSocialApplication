import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img src="/assets/Type_Imaginary.png" alt="logo" id="logo" />
          Event Social App
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item as={NavLink} to="/errors" name="Errors" />
        <Menu.Item>
          <Button as={NavLink} to="/createActivity" color="teal" content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
