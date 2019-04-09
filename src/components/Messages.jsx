import React from 'react';
import { Card } from 'react-bootstrap';
import connect from '../connect';
import { configContextConsumerDecorator } from '../context';

const mapStateToProps = (state) => {
  const {
    currentChannelId: { value },
    messages: { byId, allIds },
  } = state;
  const messages = allIds.map(id => byId[id])
    .filter(m => m.channelId === value);
  return { messages };
};

@connect(mapStateToProps)
@configContextConsumerDecorator()
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

    return (
      <div className="position-relative overflow-auto flex-shink-1 mb-3" ref={this.messagesBlockRef}>
        <div className="d-flex flex-column">
          {messages.map(m => (
            <Card key={m.id} className="mb-1">
              <Card.Header>
                <b>{m.user === currentUser ? `${m.user} (you)` : m.user}</b>
              </Card.Header>
              <Card.Body>
                <Card.Text className="text-break">{m.text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Messages;
