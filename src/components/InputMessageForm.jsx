import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import AutosizeTextarea from 'react-autosize-textarea';
import { Form, Button } from 'react-bootstrap';
import * as actions from '../actions';

const mapStateToProps = () => {
  const props = {};
  return props;
};

const actionCreators = {
  sendMessage: actions.sendMessage,
};

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
  }

  focus = () => {
    const inputField = this.formRef.current.querySelector('textarea');
    inputField.focus();
  }

  renderAutosizeTextarea = ({
    input, className, required, rows, maxRows, placeholder,
  }) => (
    <AutosizeTextarea
      {...input}
      className={className}
      required={required}
      rows={rows || 1}
      maxRows={maxRows || rows || 1}
      placeholder={placeholder || ''}
    />
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
            />
          </Form.Group>
          <Button className="align-self-end" variant="outline-primary" size="sm" type="submit">Send</Button>
        </div>
      </Form>
    );
  }
}

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(InputMessageForm);

export default reduxForm({ form: 'message' })(ConnectedNewTaskForm);