import { Icon, Segment, Header } from "semantic-ui-react";

interface Props {
    message: string;
}

export default function SuccessModal({ message }: Props) {
    return (
        <Segment basic textAlign="center">
            <Icon name="check" size="huge" color="green"/>
            <Header as="h2" content="Success!" color="green"/>
            <p><strong>{message}</strong></p>
        </Segment>
    )
}