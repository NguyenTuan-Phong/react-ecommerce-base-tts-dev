import { useState } from 'react';
import '../../assets/css/Chat.css';
import ImageWithFallback from '../img/ImageWithFallback';

const initialMessages = [
    { id: 1, text: 'Chào bạn!', sender: 'other', avatar: '/avatar-user.png' },
    { id: 2, text: 'Chào shop, bên mình còn sản phẩm này ko?', sender: 'me', avatar: '/avatar-me.png' },
];

interface ChatProps {
    onClick?: () => void;
}

const Chat = ({
    onClick 
}: ChatProps) => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([
            ...messages,
            {
                id: Date.now(),
                text: input,
                sender: 'me',
                avatar: '/avatar-me.png',
            },
        ]);
        setInput('');
    };

    return (
        <div className="chat-container">
            <div className="chat-header relative">
                Trợ Lý AI
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[24px] cursor-pointer" onClick={onClick}>
                    <span>&times;</span>
                </button>
            </div>
            <div className="chat-body">
                {messages.map(m => (
                <div
                    key={m.id}
                    className={`message ${m.sender === 'me' ? 'sent' : 'received'}`}
                >
                    <ImageWithFallback className="avatar" src={m.avatar} alt=""/>
                    <div className="bubble">{m.text}</div>
                </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                type="text"
                placeholder="Viết tin nhắn..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button className='bg-[#29a07e]!' onClick={sendMessage}>Gửi</button>
            </div>
        </div>
    );
};

export default Chat;
