import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return <Form className='lobby'
        onSubmit={e => {
            e.preventDefault();
            joinRoom(user, room);
        }} >
        <Form.Group>
            <Form.Control placeholder="Nome" onChange={e => setUser(e.target.value)} />
            <Form.Control placeholder="Sala" onChange={e => setRoom(e.target.value)} style={{marginTop: '3px'}} />
        </Form.Group>
        <Button variant="success" type="submit" disabled={!user || !room}>Entrar</Button>
    </Form>
}

export default Lobby;