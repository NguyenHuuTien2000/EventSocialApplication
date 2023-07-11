import { Link } from "react-router-dom";
import { Button, Icon, Image, Item, ItemGroup, ItemImage, Popup, PopupContent, PopupHeader, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";

interface Props {
  activity: Activity
}

export default function ActivityListItem({activity}: Props) {
  

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Maribel</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />{format(activity.date!, "dd/MM/yyyy h:mm aa")} &emsp; 
          <Icon name="marker" />{activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        {/* <ItemGroup horizontal>
          <ItemImage avatar size="small" circular src="/assets/user2.jpg" />
          &emsp;
          <Popup trigger={<ItemImage size="small" avatar circular src="/assets/user3.jpg" />} position="right center">
            <Image size="medium" src="/assets/user3.jpg"/>
            <hr/>
            <PopupHeader style={{textAlign: "center"}}>Kane</PopupHeader>
            <Segment secondary>
              18 Followers
            </Segment>
            <Button positive content="Follow" color="green" fluid/>
          </Popup>
        </ItemGroup> */}
        Attendees go here
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button 
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
