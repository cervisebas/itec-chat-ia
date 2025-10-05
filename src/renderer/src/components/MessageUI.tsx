import { MessageItem } from '@renderer/interfaces/MessageItem';
import classNames from 'classnames';
import React from 'react';
import { PulseLoader } from 'react-spinners';

interface IProps extends MessageItem {}

export const MessageUI = React.memo(function (props: IProps) {
  return (
    <div
      className={classNames([
        'flex flex-row',
        {
          'justify-end': props.type === 'user',
          'justify-start': props.type === 'ia',
        },
      ])}
    >
      <div className={'p-3 bg-[#303030] rounded-lg text-white'}>
        {props.content}

        {props.generating && (
          <div className={'w-full pt-2 flex justify-end'}>
            <PulseLoader color="white" size={5} />
          </div>
        )}
      </div>
    </div>
  );
});
