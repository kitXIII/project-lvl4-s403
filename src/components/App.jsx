import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ChannelsList from './ChannelsList';
import InputMessageForm from './InputMessageForm';
import Messages from './Messages';

const App = () => (
  <div>
    <div className="d-sm-none mb-3">
      <h5>Channels</h5>
      <hr />
      <ChannelsList />
    </div>
    <Row>
      <Col className="d-none d-sm-block" sm={4} lg={3}>
        <h5>Channels</h5>
        <hr />
        <ChannelsList />
      </Col>
      <Col sm={8} lg={9}>
        <h5>Chat</h5>
        <hr />
        <div className="chat-container d-flex flex-column align-items-stretch">
          <div className="chat-messages-container mb-3">
            <Messages />
          </div>
          <div className="chat-input">
            <InputMessageForm />
          </div>
        </div>
      </Col>
    </Row>
  </div>
);

export default App;
