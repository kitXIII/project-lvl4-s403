import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutosizeTextarea from 'react-autosize-textarea';
import { Form, Button } from 'react-bootstrap';
import Hotkeys from 'react-hot-keys';
import connect from '../connect';

const mapStateToProps = () => {
  const props = {};
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'message' })
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

  handleSubmit = ({ text }) => {
    const { sendMessage, reset } = this.props;
    sendMessage({ text });
    reset();
    console.log(text); // eslint-disable-line no-console
  }

  focus = () => {
    const inputField = this.formRef.current.querySelector('textarea');
    inputField.focus();
  }

  renderAutosizeTextarea = ({
    input, className, required, rows, maxRows, placeholder, handleSubmit,
  }) => (
    <Hotkeys keyName="ctrl+Enter" filter={() => true} onKeyDown={handleSubmit(this.handleSubmit)}>
      <AutosizeTextarea
        {...input}
        className={className}
        required={required}
        rows={rows || 1}
        maxRows={maxRows || rows || 1}
        placeholder={placeholder || ''}
      />
    </Hotkeys>
  )

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)} ref={this.formRef}>
        <div className="d-flex flex-column">
          <Form.Group>
            <Field
              className="form-control"
              name="text"
              component={this.renderAutosizeTextarea}
              rows={3}
              maxRows={8}
              required
              type="text"
              placeholder="Input message here"
              handleSubmit={handleSubmit}
            />
          </Form.Group>
          <Button className="align-self-end" variant="outline-primary" size="sm" type="submit">Send</Button>
        </div>
      </Form>
    );
  }
}

export default InputMessageForm;
