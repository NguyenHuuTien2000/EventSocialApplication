import { Divider, Grid, Header, Item, Segment, Statistic } from "semantic-ui-react"
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";
import { Fragment } from "react";

interface Props {
  profile: Profile
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <Segment>
      <Grid divided>
        <Grid.Column width={8}>
          <Item.Group>
            <Item>
              <Item.Image size="small" circular src={profile.image || `/assets/user.png`} />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName} /> 
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Item>
            <Header as={"h4"}>Events hosted:&emsp;{profile.hostedEventsCount}</Header>
            <Header as={"h4"}>Events joined:&emsp;{profile.joinedEventsCount}</Header>
            {profile.eventDate !== null? (
              <Fragment>
                <Header as={"h4"}>Upcoming event hosted: {profile.eventDate}</Header>
                <Link to={`/activities/${profile.eventId}`}>Click here for more details</Link>
              </Fragment>
            ) : (
              <Header as={"h4"}>This user has not hosted any events</Header>
            )}
          </Item>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount}/>
            <Statistic label='Following' value={profile.followingCount}/>
          </Statistic.Group>
          <Divider />
          <FollowButton profile={profile}/>
        </Grid.Column>
      </Grid>
    </Segment>
  );
})
