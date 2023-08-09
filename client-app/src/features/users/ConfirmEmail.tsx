import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import useQuery from "../../app/util/hooks";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import LoginForm from "./LoginForm";

export default function ConfirmEmail() {
    const {modalStore} = useStore()
    const email = useQuery().get("email") as string
    const token = useQuery().get("token") as string

    const Status = {
        Pending: "Pending",
        Confirmed: "Confirmed",
        Rejected: "Rejected"
    }

    const [status, setStatus] = useState(Status.Pending)

    function handleResend() {
      agent.Account.resendEmailConfirmation(email)
        .then(() => {
          toast.success("Confirmation email resent");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(() => {
      agent.Account.verifyEmail(token, email)
        .then(() => {
          setStatus(Status.Confirmed);
        })
        .catch(() => {
          setStatus(Status.Rejected);
        })
    }, [Status.Confirmed, Status.Rejected, token, email])

    function getBody() {
      switch (status) {
        case Status.Pending:
          return <p>Please check your email (including junk) for a confirmation link</p>
        case Status.Rejected:
          return (
            <Fragment>
              <p>Verification failed - Please click the button below to resend the confirmation email</p>
              <Button onClick={handleResend} color="purple" fluid size="huge" content="Resend Confirmation Email"/>
            </Fragment>
          )
        case Status.Confirmed:
          return (
            <Fragment>
              <p>Successfully Verified! - You can now login</p>
              <Button onClick={() => modalStore.openModal(<LoginForm />)} color="purple" fluid size="huge" content="Login" />
            </Fragment>
          )
      }
    }

    return (
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name="mail" />
          Email Confirmation
        </Header>
        <Segment.Inline>
          {getBody()}
        </Segment.Inline>
      </Segment>
    )
}