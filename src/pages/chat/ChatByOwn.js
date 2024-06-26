import React from 'react';
import '../../scss/pages/chat/ChatByOwn.scss';

const ChatByOwn = ({message}) => {
  return (
    <div className='ChatByOwn'>
      <div className='chat-user-text'>
        <p>{message}</p>
      </div>
      {/* <div className='chat-user-img'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MnOcQUfqtgTKRpCld7E-_P2JCyF-QMlesD887gUZ6A&s'></img>
      </div> */}
    </div>
  );
}

export default ChatByOwn;