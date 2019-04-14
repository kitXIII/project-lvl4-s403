import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Form, Button } from 'react-bootstrap';
import { trim } from 'lodash';
import connect from '../connect';
import { configContextConsumerDecorator } from '../context';

const mapStateToProps = (state) => {
  const {
    channels: { byId },
    currentlyUpdatingChannel: { id },
    uiChannelUpdatingModal: { show },
  } = state;
  const channel = byId[id];
  const name = channel && channel.name;
  return { show, name, channel };
};

const validate = ({ newChannelName }) => {
  const errors = {};
  const preparedValue = trim(newChannelName);
  if (!preparedValue) {
    errors.newChannelName = 'Required';
  }
  return errors;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newChannelName',
  enableReinitialize: true,
  validate,
})
@configContextConsumerDecorator()
class ChannelUpdatingModal extends React.Component {
  handleClose = () => {
    const { closeChannelUpdatingDialog, reset } = this.props;
    closeChannelUpdatingDialog();
    setTimeout(() => reset(), 1000);
  }

  handleConfirmChannelUpdating = async ({ newChannelName }) => {
    const {
      requestUpdateChannel, currentSocketId, channel,
    } = this.props;
    if (!channel.removable) {
      return;
    }
    const updatedChannel = { ...channel, name: trim(newChannelName) };
    await requestUpdateChannel(channel.id, updatedChannel, currentSocketId);
  }

  renderForm() {
    const { name, handleSubmit, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleConfirmChannelUpdating)}>
        <Form.Group>
          <Field
            className="form-control"
            name="newChannelName"
            component="input"
            type="text"
            placeholder={`Channel "${name}" rename to ...`}
            required
            disabled={submitting}
          />
        </Form.Group>
      </Form>
    );
  }

  renderApplyButton() {
    const { handleSubmit, submitting, valid } = this.props;
    return (
      <Button
        onClick={handleSubmit(this.handleConfirmChannelUpdating)}
        variant="warning"
        type="submit"
        disabled={!valid || submitting}
      >
        {!submitting ? 'Apply' : (
          <React.Fragment>
            <span className="spinner-border spinner-border-sm mr-1" role="status" />
            Applying
          </React.Fragment>)
        }
      </Button>
    );
  }

  render() {
    const {
      show, submitting, submitSucceeded,
    } = this.props;
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton={!submitting}>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitSucceeded ? 'Channel updated successful' : this.renderForm()}
        </Modal.Body>
        <Modal.Footer>
          {submitting || submitSucceeded ? null : (
            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
          )}
          {submitSucceeded ? null : this.renderApplyButton()}
          {!submitSucceeded ? null : (
            <Button onClick={this.handleClose} variant="success">OK</Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelUpdatingModal;
