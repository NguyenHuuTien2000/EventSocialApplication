import { Fragment } from "react";
import {
  Grid,
  Menu,
  Segment,
  Image,
  SegmentGroup,
  Item,
} from "semantic-ui-react";

export default function FakeProfile() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <SegmentGroup>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size="small" src="/assets/user1.jpg" />
                <Item.Content>
                  <Item.Header >
                    Yukari
                  </Item.Header>
                  <Item.Description><strong>6</strong>&emsp;Followers&emsp;|&emsp;<strong>9</strong>&emsp;Followings</Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment  secondary>
            Looks like you don't have any bio yet. Write something here!
          </Segment>
        </SegmentGroup>
      </Grid.Column>
      <Grid.Column width={6}>
        <Menu vertical size="large" style={{ width: "100%" }}>
          <Menu.Item content="About"/>
          <Menu.Item content="Photos" />
          <Menu.Item content="Followers" />
          <Menu.Item content="Followings" />
        </Menu>
      </Grid.Column>
    </Grid>
  );
}
