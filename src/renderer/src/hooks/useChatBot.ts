import { ChatBot } from '@renderer/classes/ChatBot';
import { MessageItem } from '@renderer/interfaces/MessageItem';
import { useRef, useState } from 'react';

export function useChatBot() {
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const chatBot = useRef(new ChatBot());

  async function askBot(message: string) {
    let _messages = [...messages];
    _messages.push({
      type: 'user',
      content: message,
    });
    let indexMessage = _messages.push({
      type: 'ia',
      content: '',
      generating: true,
    });
    indexMessage--;

    setMessages(_messages);
    setGenerating(true);

    const request = chatBot.current.ask(message);

    request.subscribe({
      next(value) {
        _messages = [..._messages];
        _messages[indexMessage].content = value;
        setMessages(_messages);
      },
      error(err) {
        _messages = [..._messages];
        _messages[indexMessage].generating = false;
        setMessages(_messages);
        console.error(err);
        setGenerating(false);
      },
      complete() {
        _messages = [..._messages];
        _messages[indexMessage].generating = false;
        setMessages(_messages);
        setGenerating(false);
      },
    });
  }

  async function sendMessage(message: string) {
    askBot(message);
  }

  return { messages, generating, sendMessage };
}
