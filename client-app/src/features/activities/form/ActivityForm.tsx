import React, {  useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const message = "This field can only contain letters and numbers"

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").matches(/^[a-zA-Z0-9 ]*$/, message),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required").matches(/^[a-zA-Z0-9 ]*$/, message),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required("City is required").matches(/^[a-zA-Z0-9 ]*$/, message),
    venue: Yup.string().required("Venue is required").matches(/^[a-zA-Z0-9 ]*$/, message),
  })

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)))
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Event Details" sub color="teal"/>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput placeholder="Category" name="category" options={categoryOptions} />
            <MyDateInput
             placeholderText="Date" 
             name="date" 
             showTimeSelect 
             timeCaption="time" 
             dateFormat="dd/MM/yyyy, h:mm aa" />
            <Header content="Location Details" sub color="teal"/>
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              color="yellow"
              type="submit"
              content="Submit" />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
              color="purple" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
