const ConnectedUsers = ({ users, room }) => <div className='user-list'>
    <h4 className="room" >{room}</h4>
    <h4>Usuários conectados</h4>
    {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
</div>

export default ConnectedUsers;