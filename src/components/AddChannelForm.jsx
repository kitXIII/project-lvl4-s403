import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import connect from '../connect';
import { configContextConsumerDecorator } from '../context';

@connect()
@reduxForm({ form: 'сhannelToAdd' })
@configContextConsumerDecorator()
class ChannelsList extends React.Component {
  handleSubmit = async ({ channelName }) => {
    const { reset, createChannel, currentSocketId } = this.props;
    await createChannel(channelName, currentSocketId);
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
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
              required
              disabled={submitting}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" type="submit" disabled={submitting}>
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
