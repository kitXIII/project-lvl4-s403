import React from 'react';
import {
  Col, Row, Button, Collapse, Alert,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import connect from '../connect';
import ChannelsList from './ChannelsList';
import InputMessageForm from './InputMessageForm';
import Messages from './Messages';
import AddChannelForm from './AddChannelForm';

const mapStateToProps = (state) => {
  const {
    channels: { byId },
    currentChannelId,
    uiCollapseMenu: { isOpen },
    alert,
  } = state;
  const currentChannelName = byId[currentChannelId].name;
  return { currentChannelName, collapseMenuIsOpen: isOpen, alert };
};

@connect(mapStateToProps)
class App extends React.Component {
  toggleMenuCollapse = () => {
    const { toggleMenuState } = this.props;
    toggleMenuState();
  }

  closeAlert = () => {
    const { deleteErrorAlert } = this.props;
    deleteErrorAlert();
  }

  render() {
    const {
      currentChannelName,
      collapseMenuIsOpen,
      alert,
    } = this.props;
    return (
      <div className="vh-100 d-flex flex-column">
        <Alert show={alert.show} dismissible variant="danger" className="mt-3" onClose={this.closeAlert}>
          {alert.message}
        </Alert>
        <Row className="h-100">
          <Col className="d-none d-sm-block py-3" sm={4} lg={3}>
            <h5>Channels</h5>
            <hr />
            <AddChannelForm />
            <ChannelsList />
          </Col>
          <Col sm={8} lg={9} className="h-100">
            <div className="d-flex flex-column py-3 justify-content-end h-100">
              <div className="mb-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">{`# ${currentChannelName}`}</h5>
                  <div className="d-sm-none">
                    <Button
                      variant="light"
                      size="sm"
                      onClick={this.toggleMenuCollapse}
                      aria-controls="example-ollapse-text"
                      aria-expanded={collapseMenuIsOpen}
                    >
                      <FontAwesomeIcon icon={collapseMenuIsOpen ? faTimes : faBars} />
                    </Button>
                  </div>
                </div>
                <Collapse in={collapseMenuIsOpen}>
                  <div className="mt-3 d-sm-none" id="example-collapse-text">
                    <ChannelsList />
                    <AddChannelForm />
                  </div>
                </Collapse>
                <hr />
              </div>
              <Messages />
              <InputMessageForm />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
