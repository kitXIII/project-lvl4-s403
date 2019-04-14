/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds } } = state;
  const { currentChannelId: { value } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, currentChannelId: value };
};

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  changeChannelHandler = id => () => {
    const { setCurrentChannel, currentChannelId } = this.props;
    if (currentChannelId !== id) {
      setCurrentChannel({ id });
    }
  }

  deleteChannelHandler = id => () => {
    const { openChannelDeletionDialog } = this.props;
    openChannelDeletionDialog({ id });
  }

  renameChannelHandler = id => () => {
    const { openChannelUpdatingDialog } = this.props;
    openChannelUpdatingDialog({ id });
  }

  renderChannel({ id, name, removable }) {
    const { currentChannelId } = this.props;
    const itemClass = cn({
      'list-group-item': true,
      'list-group-item-action': true,
      'list-group-item-light': true,
      active: id === currentChannelId,
      'd-flex': true,
      'justify-content-between': true,
      'align-items-center': true,
    });

    return (
      <li key={id} className={itemClass} onClick={this.changeChannelHandler(id)}>
        {name}
        {!removable ? null : (
          <div>
            <FontAwesomeIcon
              icon={faPen}
              title="rename channel"
              className="text-dark mr-3"
              style={{ fontSize: '0.85em', cursor: 'pointer' }}
              onClick={this.renameChannelHandler(id)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              title="remove channel"
              className="text-dark"
              style={{ fontSize: '0.85em', cursor: 'pointer' }}
              onClick={this.deleteChannelHandler(id)}
            />
          </div>
        )}
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
