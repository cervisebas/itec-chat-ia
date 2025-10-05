import React, { useCallback, useState } from 'react';
import SendIcon from '../assets/send.svg';

interface IProps {
  send?(msg: string): void;
}

export const InputChat = React.memo(function (props: IProps) {
  const [value, setValue] = useState('');

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const onClickSend = function (): void {
    props.send?.(value);
    setValue('');
  };

  return (
    <div className={'pb-6 w-full flex justify-center px-5 h-min'}>
      <div className={'w-full flex flex-row max-w-[1000px]'}>
        <input
          type="text"
          className={
            'w-full rounded-l-full bg-[#303030] text-white py-4 px-6 outline-none'
          }
          placeholder="Pregunta lo que quieras"
          value={value}
          onChange={onChange}
        />
        <button
          className={'bg-[#303030] rounded-r-full py-4 px-6 cursor-pointer'}
          onClick={onClickSend}
        >
          <img src={SendIcon} className={'size-[20px]'} />
        </button>
      </div>
    </div>
  );
});
