import { ChatUI } from './components/ChatUI';
import { InputChat } from './components/InputChat';
import { useChatBot } from './hooks/useChatBot';

export function App(): React.JSX.Element {
  const { messages, generating, sendMessage } = useChatBot();

  return (
    <div className={'flex size-full flex-col'}>
      <ChatUI messages={messages} />
      <InputChat loading={generating} send={sendMessage} />
    </div>
  );
}
