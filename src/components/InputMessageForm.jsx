import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
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
    const inputField = this.formRef.current.querySelector('textarea');
    if (inputField) {
      inputField.focus();
    }
  }

  handleSubmit = ({ text }) => {
    const { sendMessage, reset } = this.props;
    sendMessage({ text });
    reset();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} ref={this.formRef}>
        <div className="d-flex flex-column">
          <div className="form-group">
            <Field
              className="form-control"
              name="text"
              component="textarea"
              required
              type="text"
              rows="3"
            />
          </div>
          <button className="btn btn-sm btn-success align-self-end" type="submit">send</button>
        </div>
      </form>
    );
  }
}

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(InputMessageForm);

export default reduxForm({ form: 'message' })(ConnectedNewTaskForm);
