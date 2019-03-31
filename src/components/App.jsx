import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ChannelsList from './ChannelsList';
import InputMessageForm from './InputMessageForm';
import Messages from './Messages';

const App = () => (
  <Row>
    <Col className="d-none d-sm-block py-3" sm={4} lg={3}>
      <h5>Channels</h5>
      <hr />
      <ChannelsList />
    </Col>
    <Col sm={8} lg={9}>
      <div className="chat-container d-flex flex-column py-3 justify-content-end">
        <div className="mb-auto">
          <h5>Chat</h5>
          <hr />
        </div>
        <Messages />
        <InputMessageForm />
      </div>
    </Col>
  </Row>
);

export default App;
