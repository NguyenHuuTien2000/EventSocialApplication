import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { observer } from "mobx-react-lite";

interface Props {
  activity: Activity
}

export default observer(function ActivityListItem({activity}: Props) {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 75 ? str.substring(0, 75) + "..." : str;
    }
  }

  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label attached="top" style={{ textAlign: "center" }} color="red" content="Cancelled" />
        )}
        <Item.Group>
          <Item>
            <Item.Image style={{ marginBottom: 3 }} size="tiny" circular src={activity.host?.image || "/assets/user.png"} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by <Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label color="orange">You are hosting this event</Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label color="green">You are going to this event</Label>
                </Item.Description>
              )}
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
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{truncate(activity.description)}</span>
        <Button 
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"/>
      </Segment>
    </Segment.Group>
  );
})
