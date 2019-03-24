import React from 'react';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds } } = state;
  const { currentChannelId } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, currentChannelId };
};

@connect(mapStateToProps)
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

export default ChannelsList;
