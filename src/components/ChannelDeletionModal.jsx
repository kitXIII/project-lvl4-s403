import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';
import { configContextConsumerDecorator } from '../context';

const mapStateToProps = (state) => {
  const {
    channels: { byId },
    currentlyDeletedChannel: { id },
    channelDeletionState,
    uiChannelDeletionModal: { show },
  } = state;
  const channel = byId[id];
  const channelName = channel && channel.name;
  return {
    show, state: channelDeletionState, channel, channelName,
  };
};

@connect(mapStateToProps)
@configContextConsumerDecorator()
class ChannelDeletionModal extends React.Component {
  constructor(props) {
    super(props);
    this.successButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();
  }

  componentDidUpdate() {
    const { state } = this.props;
    if (state === 'success') {
      if (this.successButtonRef.current) {
        this.successButtonRef.current.focus();
      }
    }
    if (state === 'prepare') {
      if (this.cancelButtonRef.current) {
        this.cancelButtonRef.current.focus();
      }
    }
  }

  handleClose = () => {
    const { closeChannelDeletionDialog } = this.props;
    closeChannelDeletionDialog();
  }

  handleConfirmChannelDeletion = async () => {
    const {
      requestDeleteChannel, channel, currentSocketId,
    } = this.props;
    if (!channel || !channel.removable) {
      return;
    }
    await requestDeleteChannel(channel.id, currentSocketId);
  }

  renderCancelButton() {
    const { state } = this.props;
    if (state !== 'prepare' && state !== 'fail') {
      return null;
    }
    return (
      <Button variant="secondary" onClick={this.handleClose} ref={this.cancelButtonRef}>Cancel</Button>
    );
  }

  renderDeleteButton() {
    const { state } = this.props;
    if (state !== 'prepare' && state !== 'pending' && state !== 'fail') {
      return null;
    }
    return (
      <Button variant="danger" onClick={this.handleConfirmChannelDeletion}>
        {state === 'pending'
          ? (
            <span>
              <span className="spinner-border spinner-border-sm mr-1" role="status" />
              Working...
            </span>)
          : 'Delete'
        }
      </Button>
    );
  }

  renderSuccessButton() {
    const { state } = this.props;
    if (state !== 'success') {
      return null;
    }
    return <Button variant="success" onClick={this.handleClose} ref={this.successButtonRef}>OK</Button>;
  }

  render() {
    const { show, state, channelName } = this.props;

    const getBodyContent = {
      init: () => {},
      prepare: chName => `Do you really want to delete the channel "${chName}"`,
      pending: chName => `Do you really want to delete the channel "${chName}"`,
      fail: chName => `Some problem with deletion the channel "${chName}"`,
      success: () => 'Channel has been deleted',
    };

    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {getBodyContent[state](channelName)}
        </Modal.Body>
        <Modal.Footer>
          {this.renderCancelButton()}
          {this.renderDeleteButton()}
          {this.renderSuccessButton()}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelDeletionModal;
