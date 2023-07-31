import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Tab, Grid, Header, TabProps, Card, Image } from "semantic-ui-react";
import { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default observer(function ProfileActivities() {
  const { profileStore } = useStore();
  const { profile, loadUserActivities, loadingActivities, userActivities } = profileStore;

  useEffect(() => {
    loadUserActivities(profile!.username)
  }, [loadUserActivities, profile])

  const panes = [
    { menuItem: "Future Events", pane: { key: "future" } },
    { menuItem: "Past Events", pane: { key: "past" } },
    { menuItem: "Hosting", pane: { key: "host" } }
  ]

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserActivities(profile!.username, panes[data.activeIndex as number].pane.key)
  }

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="Events" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab 
            panes={panes}
            menu={{
              secondary: true,
              pointing: true
            }}
            onTabChange={(e, data) => handleTabChange(e, data)}/>
            <br/>
            <Card.Group itemsPerRow={4}>
              {userActivities.map((activity) => (
                <Card as={Link} to={`/activities/${activity.id}`}  key={activity.id}>
                  <Image src={`/assets/categoryImages/${activity.category}.jpg`} style={{ minHeight: 100, objectFit: "cover" }} />
                  <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta textAlign="center">
                      <span>{format(activity.date, "dd MM yyyy")}</span>
                      <span> {format(activity.date, "h:mm a")}</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
