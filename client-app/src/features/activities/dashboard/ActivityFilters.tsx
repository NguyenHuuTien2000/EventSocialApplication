import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Button, Header, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";
import { ActivityDates } from "../../../app/models/activity";

export default observer(function ActivityFilters() {
  const {activityStore: { predicate, setPredicate, dates, getDates }} = useStore();
  const [ datesHighlight, setDates ] = useState(new ActivityDates());

  useEffect(() => {
    getDates().then(() => setDates(dates))
  },[dates, getDates])

  function handleHighlight(date : string){
    if (datesHighlight.isHost.has(date)) {
      return "hosted-date"
    }
    if (datesHighlight.isGoing.has(date)) {
      return "going-date"
    }
    return ""
  }

  return (
    <Fragment>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Event Filters" />
        <Menu.Item
          content="All events"
          active={predicate.has('all')}
          onClick={() => setPredicate('all', 'true')}
        />
        <Menu.Item
          content="I'm going"
          active={predicate.has('isGoing')}
          onClick={() => setPredicate('isGoing', 'true')}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.has('isHost')}
          onClick={() => setPredicate('isHost', 'true')}
        />
        <Menu.Item
          content="I'm following"
          active={predicate.has('isFollowing')}
          onClick={() => setPredicate('isFollowing', 'true')}
        />
      </Menu>
      
      <Segment className="calendar">
        <Calendar
          onChange={(date) => setPredicate("startDate", date as Date)}
          value={predicate.get("startDate") || new Date()}
          tileClassName={(date) => {return handleHighlight(format(date.date, 'dd/MM/yyyy'));}}
        />
        <div className="notes">
          <p ><Button className="note-buttons" color="green" content="1"/> Days with events that you attend</p>
          <p><Button className="note-buttons" color="orange" content="1"/> Days with events that you host</p>
        </div>
      </Segment>
    </Fragment>
  );
});
