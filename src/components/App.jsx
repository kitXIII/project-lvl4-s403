import React from 'react';
import {
  Col, Row, Button, Collapse,
} from 'react-bootstrap';
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
  constructor(props, context) {
    super(props, context);

    this.state = {
      collapseMenuIsOpen: false,
    };
  }

  render() {
    const { currentChannelName } = this.props;
    const { collapseMenuIsOpen } = this.state;
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
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">{`#${currentChannelName}`}</h5>
                <div className="d-sm-none">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => this.setState({ collapseMenuIsOpen: !collapseMenuIsOpen })}
                    aria-controls="example-collapse-text"
                    aria-expanded={collapseMenuIsOpen}
                  >
                    <span className="navbar-toggler-icon" />
                  </Button>
                </div>
              </div>
              <Collapse in={collapseMenuIsOpen}>
                <div className="mt-3 d-sm-none" id="example-collapse-text">
                  <ChannelsList />
                </div>
              </Collapse>
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
