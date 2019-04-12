import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';
import { configContextConsumerDecorator } from '../context';

const mapStateToProps = (state) => {
  const {
    channels: { byId },
    channelDeletionConfirmation,
    currentlyDeletedChannel: { id },
  } = state;
  const channel = byId[id];
  const channelName = channel && channel.name;
  return { state: channelDeletionConfirmation, channel, channelName };
};

@connect(mapStateToProps)
@configContextConsumerDecorator()
class ChannelDeletionConfirmationModal extends React.Component {
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
    const { state, channelName } = this.props;
    return (
      <Modal show={state !== 'init'} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === 'prepare' || state === 'pending' || state === 'fail'
            ? `Do you really want to delete the channel "${channelName}"`
            : 'Channel has been deleted'
          }
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

export default ChannelDeletionConfirmationModal;
