import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import AutosizeTextarea from 'react-autosize-textarea';
import Form from 'react-bootstrap/Form';
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

  focus() {
    const inputField = this.formRef.current.querySelector('textarea');
    inputField.focus();
  }

  renderAutosizeTextarea = ({
    input, className, required, rows, maxRows,
  }) => (
    <AutosizeTextarea
      {...input}
      className={className}
      required={required}
      rows={rows}
      maxRows={maxRows || rows}
    />
  )

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="d-flex flex-column">
          <div className="form-group">
            <Field
              className="form-control"
              name="text"
              component={this.renderAutosizeTextarea}
              rows={3}
              maxRows={8}
              required
              type="text"
            />
          </div>
          <button className="btn btn-sm btn-success align-self-end" type="submit">send</button>
        </div>
      </Form>
    );
  }
}

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(InputMessageForm);

export default reduxForm({ form: 'message' })(ConnectedNewTaskForm);
