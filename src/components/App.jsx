import React from 'react';
import { Col, Row } from 'react-bootstrap';
import connect from '../connect';
import ChannelsList from './ChannelsList';
import InputMessageForm from './InputMessageForm';
import Messages from './Messages';

const mapStateToProps = (state) => {
  const { channels: { byId } } = state;
  const { currentChannelId } = state;
  const currentChannelName = byId[currentChannelId].name;
  return { currentChannelName };
};

@connect(mapStateToProps)
class App extends React.Component {
  render() {
    const { currentChannelName } = this.props;
    return (
      <Row>
        <Col className="d-none d-sm-block py-3" sm={4} lg={3}>
          <h5>Channels</h5>
          <hr />
          <ChannelsList />
        </Col>
        <Col sm={8} lg={9}>
          <div className="chat-container d-flex flex-column py-3 justify-content-end">
            <div className="mb-auto">
              <h5>{`#${currentChannelName}`}</h5>
              <hr />
            </div>
            <Messages />
            <InputMessageForm />
          </div>
        </Col>
      </Row>
    );
  }
}

export default App;
