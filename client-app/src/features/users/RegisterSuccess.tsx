import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import useQuery from "../../app/util/hooks";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { Fragment, useState } from "react";

export default function RegisterSuccess() {
  const email = useQuery().get("email") as string;
  const[emailSent, setEmailSent] = useState(false);

  function handleResend() {
    agent.Account.resendEmailConfirmation(email)
      .then(() => {
        toast.success("Confirmation email resent");
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
        }, 60000)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Segment textAlign="center" placeholder>
      <Header icon color="green">
        <Icon name="check" />
        Successfully Registered!
      </Header>
      <p>Please check your email (including junk) for a confirmation link</p>
      {email && (
        <Fragment>
          <p>Verification email not received? Click the button below to resend. Please wait 60 seconds before sending another request</p>
          <Button disabled={emailSent} onClick={handleResend} color="purple" fluid size="huge" content="Resend Confirmation Email" />
        </Fragment>
      )}
    </Segment>
  );
}
