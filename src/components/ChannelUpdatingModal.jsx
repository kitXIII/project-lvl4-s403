import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Form, Button } from 'react-bootstrap';
import { trimStart, trimEnd } from 'lodash';
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
  const preparedValue = trimEnd(newChannelName);
  if (preparedValue === '') {
    errors.newChannelName = 'Required';
  }
  return errors;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newChannelName',
  validate,
})
@configContextConsumerDecorator()
class ChannelUpdatingModal extends React.Component {
  constructor(props) {
    super(props);
    this.successButtonRef = React.createRef();
    this.formRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { show: prevShow } = prevProps;
    const {
      show, name, initialize, submitSucceeded,
    } = this.props;
    if (prevShow === false && show === true) {
      initialize({ newChannelName: name });

      const input = this.formRef.current.querySelector('input');
      input.focus();
    }
    if (submitSucceeded) {
      this.successButtonRef.current.focus();
    }
  }

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

    const updatedChannel = { ...channel, name: trimEnd(newChannelName) };
    await requestUpdateChannel(channel.id, updatedChannel, currentSocketId);
  }

  renderForm() {
    const {
      handleSubmit, submitting, submitSucceeded,
    } = this.props;

    if (submitSucceeded) {
      return 'Channel updated successful';
    }

    return (
      <Form onSubmit={handleSubmit(this.handleConfirmChannelUpdating)} ref={this.formRef}>
        <Form.Group>
          <Field
            className="form-control"
            name="newChannelName"
            component="input"
            type="text"
            normalize={trimStart}
            disabled={submitting}
          />
        </Form.Group>
      </Form>
    );
  }

  renderCancelButton() {
    const { submitting, submitSucceeded } = this.props;
    if (submitting || submitSucceeded) {
      return null;
    }
    return <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>;
  }

  renderApplyButton() {
    const {
      handleSubmit, submitting, valid, submitSucceeded, pristine,
    } = this.props;
    if (submitSucceeded) {
      return null;
    }
    return (
      <Button
        onClick={handleSubmit(this.handleConfirmChannelUpdating)}
        variant="warning"
        type="submit"
        disabled={!valid || submitting || pristine}
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

  renderSuccessButton() {
    const { submitSucceeded } = this.props;
    if (!submitSucceeded) {
      return null;
    }
    return <Button onClick={this.handleClose} variant="success" ref={this.successButtonRef}>OK</Button>;
  }

  render() {
    const { show, submitting } = this.props;
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton={!submitting}>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderForm()}
        </Modal.Body>
        <Modal.Footer>
          {this.renderCancelButton()}
          {this.renderApplyButton()}
          {this.renderSuccessButton()}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelUpdatingModal;
