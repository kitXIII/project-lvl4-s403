/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cn from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import connect from '../connect';

const CustomToggle = React.forwardRef(({ onClick, children }, ref) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };
  return (
    <div ref={ref} onClick={handleClick}>
      {children}
    </div>
  );
});

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
          <Dropdown drop="left">
            <Dropdown.Toggle as={CustomToggle}>
              <FontAwesomeIcon
                icon={faCog}
                className="text-dark"
                style={{ cursor: 'pointer' }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.renameChannelHandler(id)}>
                Rename channel
              </Dropdown.Item>
              <Dropdown.Item onClick={this.deleteChannelHandler(id)}>
                Delete channel
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
