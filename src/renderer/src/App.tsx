import { ChatUI } from './components/ChatUI';
import { InputChat } from './components/InputChat';
import { TestMessages } from './constants/test.messages';

export function App(): React.JSX.Element {
  return (
    <div className={'flex size-full flex-col'}>
      <ChatUI messages={TestMessages} />
      <InputChat />
    </div>
  );
}
