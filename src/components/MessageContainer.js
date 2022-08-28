import { useEffect, useRef } from 'react';

const MessageContainer = ({ messages, currentUser }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    function colorMessage(user){

        console.log(user.id + " ---- " + currentUser)

        if(user.user.toString().includes("automática")){
            return 'bg-info';
        } else if(user.id !== currentUser){
            return 'bg-primary';
        } else {
            return 'bg-success';
        }
    }

    return <div ref={messageRef} className='message-container' >
        {messages.map((m, index) =>
            <div key={index} className='user-message'>
                <div className={`message ${colorMessage(m)}`}>{m.message}</div>
                <div className='from-user'>{m.user}</div>
            </div>
        )}
    </div>
}

export default MessageContainer;