import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds } } = state;
  const { currentChannelId } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, currentChannelId };
};

class ChannelsList extends React.Component {
  renderChannel({ id, name }) {
    const { currentChannelId } = this.props;

    const itemClass = cn({
      'list-group-item': true,
      'list-group-item-action': true,
      active: id === currentChannelId,
    });

    return (
      <li key={id} className={itemClass}>
        <span>{name}</span>
      </li>
    );
  }

  render() {
    const { channels } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <ul className="list-group">
        {channels.map(channel => this.renderChannel(channel))}
      </ul>
    );
  }
}

export default connect(mapStateToProps)(ChannelsList);
