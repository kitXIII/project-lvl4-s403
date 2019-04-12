import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutosizeTextarea from 'react-autosize-textarea';
import { Form, Button } from 'react-bootstrap';
import Hotkeys from 'react-hot-keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { trim } from 'lodash';
import connect from '../connect';
import { configContextConsumerDecorator } from '../context';

const mapStateToProps = (state) => {
  const { currentChannelId: { value } } = state;
  return { currentChannelId: value };
};

const validate = ({ text }) => {
  const errors = {};
  if (!text) {
    errors.text = 'Required';
  }
  const preparedText = trim(text);
  if (!preparedText) {
    errors.text = 'Too many spaces';
  }
  return errors;
};

@connect(mapStateToProps)
@reduxForm({ form: 'message', validate })
@configContextConsumerDecorator()
class InputMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  handleSubmit = async ({ text }) => {
    const {
      requestAddMessage, reset, currentChannelId, currentUser, currentSocketId,
    } = this.props;
    const preparedText = trim(text);
    // eslint-disable-next-line max-len
    await requestAddMessage({ text: preparedText, user: currentUser }, currentChannelId, currentSocketId);
    reset();
  }

  focus = () => {
    const inputField = this.formRef.current.querySelector('textarea');
    inputField.focus();
  }

  renderAutosizeTextarea = ({
    input, className, rows, maxRows, placeholder, disabled,
  }) => (
    <AutosizeTextarea
      {...input}
      className={className}
      rows={rows || 1}
      maxRows={maxRows || rows || 1}
      placeholder={placeholder || ''}
      disabled={disabled}
    />
  )

  render() {
    const { handleSubmit, submitting, valid } = this.props;

    return (
      <Form className="flex-srink-0" onSubmit={handleSubmit(this.handleSubmit)} ref={this.formRef}>
        <Hotkeys keyName="ctrl+Enter" filter={() => true} onKeyDown={handleSubmit(this.handleSubmit)}>
          <div className="d-flex flex-column">
            <Form.Group>
              <Field
                className="form-control"
                name="text"
                component={this.renderAutosizeTextarea}
                rows={3}
                maxRows={8}
                type="text"
                placeholder="Input message here"
                disabled={submitting}
              />
            </Form.Group>
            <Button
              className="align-self-end"
              variant="outline-secondary"
              size="sm"
              type="submit"
              disabled={!valid || submitting}
            >
              {submitting
                ? <span className="spinner-border spinner-border-sm mr-1" role="status" />
                : <FontAwesomeIcon icon={faCheck} className="text-success mr-1" />
              }
              Send
            </Button>
          </div>
        </Hotkeys>
      </Form>
    );
  }
}

export default InputMessageForm;
