import { MessageItem } from '@renderer/interfaces/MessageItem';
import React, { useEffect, useRef } from 'react';
import { MessageUI } from './MessageUI';

interface IProps {
  messages: MessageItem[];
}

export const ChatUI = React.memo(function (props: IProps) {
  const refChatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refChatEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.messages]);

  return (
    <div
      id="chat-ui"
      className={
        'flex justify-center overflow-y-scroll flex-1 min-h-0 size-full py-3'
      }
    >
      <div className={'flex flex-1 flex-col gap-4 px-5 max-w-[1000px]'}>
        {props.messages.map((item, index) => (
          <MessageUI key={`message-${index}`} {...item} />
        ))}

        <div className={'w-full min-h-[20px]'} />
        <div ref={refChatEnd} />
      </div>
    </div>
  );
});
