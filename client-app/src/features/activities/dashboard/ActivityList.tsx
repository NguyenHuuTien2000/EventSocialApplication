import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities, predicate } = activityStore;

  function getMessage() {
    if (groupedActivities.length === 0) {
      return (
        <Header dividing size="medium" color="teal">
          There are no events that match your search criteria.
        </Header>
      )
    } else {
      return (
        <Header dividing size="medium" color="teal">
          Search results for "<strong color="pink">{predicate.get("keyword")}</strong>"...
        </Header>
      )
    }
  }

  return (
    <Fragment>
      {predicate.has("keyword") && 
        getMessage()
      }
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
});
