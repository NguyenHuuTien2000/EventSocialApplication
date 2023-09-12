import { observer } from "mobx-react-lite";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";
import { Fragment } from "react";

interface Props {
  attendees: Profile[]
}

export default observer(function ActivityListItemAttendees({ attendees }: Props) {
  const style = {
    borderColor: 'orange',
    borderWidth: 3
  }

  const count = attendees.length
  if (attendees.length > 5)
  {
    attendees = attendees.slice(0, 5);
  }

  return (
    <Fragment>
      <List horizontal>
        {attendees.map((attendee) => (
          <Popup 
            key={attendee.username} 
            hoverable 
            trigger={
              <List.Item
                key={attendee.username}
                as={Link}
                to={`/profiles/${attendee.username}`} >
                <Image
                  size="mini"
                  circular
                  src={attendee.image || "/assets/user.png"} 
                  style={ attendee.following ? style : null}
                  bordered
                  alt={"avatar"}/>
              </List.Item>
            }>
            <Popup.Content>
              <ProfileCard profile={attendee}/>
            </Popup.Content>
          </Popup>
        ))}
        {count - 5 > 0 && <List.Item>... and {count - 5} more</List.Item>}
      </List>
      
    </Fragment>
    
  )
})
