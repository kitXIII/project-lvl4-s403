import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { trimStart, trimEnd } from 'lodash';
import connect from '../connect';
import { configContextConsumerDecorator } from '../context';

const validate = ({ channelName }) => {
  const errors = {};
  const preparedValue = trimEnd(channelName);
  if (!preparedValue) {
    errors.channelName = 'Required';
  }
  return errors;
};

@connect()
@reduxForm({ form: 'сhannelToAdd', validate })
@configContextConsumerDecorator()
class ChannelsList extends React.Component {
  handleSubmit = async ({ channelName }) => {
    const { reset, requestAddChannel, currentSocketId } = this.props;
    await requestAddChannel(trimEnd(channelName), currentSocketId);
    reset();
  }

  render() {
    const { handleSubmit, submitting, valid } = this.props;
    return (
      <Form className="mt-3" onSubmit={handleSubmit(this.handleSubmit)}>
        <Form.Group>
          <InputGroup>
            <Field
              className="form-control"
              name="channelName"
              component="input"
              type="text"
              placeholder="add channel"
              normalize={trimStart}
              disabled={submitting}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                type="submit"
                disabled={!valid || submitting}
                title="add channel"
              >
                {submitting
                  ? <span className="spinner-border spinner-border-sm mr-1" role="status" />
                  : <FontAwesomeIcon icon={faPlus} />
                }
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}

export default ChannelsList;
