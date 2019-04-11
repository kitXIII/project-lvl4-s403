import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels: { byId }, channelDeletionConfirmation: { show, id } } = state;
  return { show, id, channel: byId[id] };
};

@connect(mapStateToProps)
class ChannelDeletionConfirmationModal extends React.Component {
  handleClose = () => {
    const { closeChannelDeletionDialog } = this.props;
    closeChannelDeletionDialog();
  }

  handleConfirmChannelDeletion = async () => {
    const { requestDeleteChannel, channel, id } = this.props;
    if (!channel || !channel.removable) {
      return;
    }
    await requestDeleteChannel(id);
    this.handleClose();
  }

  render() {
    const { show, channel } = this.props;
    if (!channel) {
      return null;
    }
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Do you really want to delete the channel "${channel.name}"`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={this.handleConfirmChannelDeletion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelDeletionConfirmationModal;
