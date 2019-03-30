import React from 'react';
import { Card } from 'react-bootstrap';
import connect from '../connect';
import { currentUserContextConsumerDecorator } from '../contexts';

const mapStateToProps = (state) => {
  const { currentChannelId, channels, messages: { byId } } = state;
  const channel = channels.byId[currentChannelId];
  const messages = channel.messages.map(id => byId[id]);
  return { messages };
};

@connect(mapStateToProps)
@currentUserContextConsumerDecorator()
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesBlockRef = React.createRef();
  }

  componentDidMount() {
    this.scrollDownMessageList();
  }

  componentDidUpdate() {
    this.scrollDownMessageList();
  }

  scrollDownMessageList = () => {
    const scrolledBlock = this.messagesBlockRef.current;
    if (scrolledBlock) {
      scrolledBlock.scrollTop = scrolledBlock.scrollHeight;
    }
  }

  render() {
    const { messages, currentUser } = this.props;
    if (messages.length === 0) {
      return null;
    }

    return (
      <div className="chat-messages d-flex flex-column mb-3" ref={this.messagesBlockRef}>
        {messages.map(m => (
          <Card key={m.id} className="mb-1">
            <Card.Header>
              <b>{m.user === currentUser ? 'Me' : m.user}</b>
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ wordBreak: 'break-all' }}>{m.text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Messages;
