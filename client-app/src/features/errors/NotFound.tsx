import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search"/>
                Oops - We've looked everywhere and could not find what you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities">
                    Return to Events page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}