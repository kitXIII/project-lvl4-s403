import React from 'react';
import { Card } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { currentChannelId, channels, messages: { byId } } = state;
  const channel = channels.byId[currentChannelId];
  const messages = channel.messages.map(id => byId[id]);
  return { messages };
};

@connect(mapStateToProps)
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.msgContainerRef = React.createRef();
  }

  componentDidMount() {
    this.scrollDownMessageList();
  }

  componentDidUpdate() {
    this.scrollDownMessageList();
  }

  scrollDownMessageList = () => {
    const scrolledBlock = this.msgContainerRef.current;
    if (scrolledBlock) {
      scrolledBlock.scrollTop = scrolledBlock.scrollHeight;
    }
  }

  render() {
    const { messages } = this.props;
    if (messages.length === 0) {
      return null;
    }

    return (
      <div className="chat-messages" ref={this.msgContainerRef}>
        {messages.map(m => (
          <Card key={m.id} className="mb-1">
            <Card.Body>
              <Card.Text className="" style={{ wordBreak: 'break-all' }}>{m.text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Messages;
