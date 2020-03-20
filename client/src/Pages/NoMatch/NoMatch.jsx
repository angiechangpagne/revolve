import React from 'react';
import { Col, Row, Container } from '../../Components/Grid';
import Jumbotron from '../../Components/Jumbotron';

const NoMatch = () => {
  <Container fluid>
    <Row> 
      <Col size="md-2">
        <Jumbotron>
          <h1> 404 Page Not Found</h1>
          <h1>
            <span rolw="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
            </span>
          </h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
}

export default NoMatch;