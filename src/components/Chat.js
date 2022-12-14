import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';
import ConnectedUsers from './ConnectedUsers';
import { Button } from 'react-bootstrap';

const Chat = ({ sendMessage, messages, users, closeConnection, currentUser, room }) => <div>
    <div className='leave-room'>
        <Button variant='danger' onClick={() => closeConnection()}>Sair da sala</Button>
    </div>
    <ConnectedUsers users={users} room={room} />
    <div className='chat'>
        <MessageContainer messages={messages} currentUser={currentUser} />
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;