import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { alerts: { byId, allIds } } = state;
  const alerts = allIds.map(id => byId[id]);
  return { alerts };
};

@connect(mapStateToProps)
class Alerts extends Component {
  closeAlert = id => () => {
    const { deleteAlert } = this.props;
    deleteAlert({ id });
  }

  render() {
    const { alerts } = this.props;
    return (
      <div className="mt-2">
        {alerts.map(({ id, type, message }) => (
          <Alert key={id} show dismissible variant={type} className="mt-1" onClose={this.closeAlert(id)}>
            {message}
          </Alert>
        ))}
      </div>
    );
  }
}

export default Alerts;
