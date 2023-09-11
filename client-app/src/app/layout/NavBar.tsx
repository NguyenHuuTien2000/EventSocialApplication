import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import ActivitySearchBar from "../../features/activities/form/ActivitySearchBar";

export default observer(function NavBar() {
  const {userStore: {user, logout, isLoggedIn}} = useStore()

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/activities" header>
          <img src="/assets/Type_Imaginary.png" alt="logo" id="logo" />
          Event Social App
        </Menu.Item>
        {isLoggedIn && (
          <Fragment>
            <Menu.Item>
              <ActivitySearchBar />
            </Menu.Item>
            <Menu.Item>
              <Button as={NavLink} to="/createActivity" color="teal" content="Create Event" />
            </Menu.Item>
            <Menu.Item position="right">
              <Image avatar spaced="right" src={user?.image || "/assets/user.png"} />
              <Dropdown pointing="top left" text={ user?.displayName }>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text="My Profile" icon="user" />
                  <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Fragment>
        )}
      </Container>
    </Menu>
  );
})
