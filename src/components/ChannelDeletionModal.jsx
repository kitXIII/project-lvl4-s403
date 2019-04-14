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

  render() {
    const { show, state, channelName } = this.props;
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === 'prepare' || state === 'pending'
            ? `Do you really want to delete the channel "${channelName}"`
            : null}
          {state === 'fail' ? `Some problem with deletion the channel "${channelName}"` : null}
          {state === 'success' ? 'Channel has been deleted' : null}
        </Modal.Body>
        <Modal.Footer>
          {state === 'prepare' || state === 'fail'
            ? (
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            )
            : null}
          {state === 'prepare' || state === 'pending' || state === 'fail'
            ? (
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
            ) : null}
          {state === 'success'
            ? (
              <Button variant="success" onClick={this.handleClose}>
                Success
              </Button>
            ) : null}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelDeletionModal;
