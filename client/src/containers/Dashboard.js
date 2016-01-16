import React from 'react';
import Relay from 'react-relay';
import { Col, Row } from 'react-bootstrap';

const ProfilePicture = () => (
  <div>ProfilePicture Here</div>
);
const UserLocation = () => (
  <div>UserLocation Here</div>
);
const UserWebsite = () => (
  <div>UserWebsite Here</div>
);


class DashboardComponent extends React.Component {
  constructor(props) {
    console.log(props);

    super(props);
  }

  render() {
    return (
      <section>
        <Row>

          <Col xs={12} sm={6} md={5} lg={4}>
            <ProfilePicture/>
            <UserLocation/>
            <UserWebsite/>
          </Col>

          <Col xs={12} sm={6} md={7} lg={8}>
            <form>

            </form>
          </Col>

        </Row>
      </section>
    );
  }
}

export const Dashboard = Relay.createContainer(DashboardComponent, {
  initialVariables: {
    id: '1'
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on GraphAPI {
        user(id: $id) {
          username,
          displayName

        }
      }
    `
  }
});
