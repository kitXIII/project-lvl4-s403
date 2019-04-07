import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@reduxForm({ form: 'сhannelToAdd' })
class ChannelsList extends React.Component {
  render() {
    return (
      <Form className="mt-3">
        <Form.Group>
          <InputGroup>
            <Field
              className="form-control"
              name="channel"
              component="input"
              type="text"
              placeholder="add channel"
              required
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" type="submit">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}

export default ChannelsList;
