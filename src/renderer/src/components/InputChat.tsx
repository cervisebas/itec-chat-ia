import React, { useCallback, useState } from 'react';
import SendIcon from '../assets/send.svg';
import { ClipLoader } from 'react-spinners';
import classNames from 'classnames';

interface IProps {
  loading?: boolean;
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

  const onEnter = function (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onClickSend();
    }
  };

  return (
    <div className={'pb-6 w-full flex justify-center px-5 h-min'}>
      <div className={'w-full flex flex-row max-w-[1000px]'}>
        <input
          type="text"
          className={classNames([
            'w-full rounded-l-full text-white py-4 px-6 outline-none',
            {
              'bg-[#303030]': !props.loading,
              'bg-[#696969]': props.loading,
            },
          ])}
          placeholder="Pregunta lo que quieras"
          value={value}
          onChange={onChange}
          onKeyDown={onEnter}
        />
        <button
          className={classNames([
            'rounded-r-full py-4 px-6 cursor-pointer',
            {
              'bg-[#303030]': !props.loading,
              'bg-[#696969] cursor-progress': props.loading,
            },
          ])}
          onClick={onClickSend}
        >
          {props.loading ? (
            <ClipLoader color="white" size={30} />
          ) : (
            <img src={SendIcon} className={'size-[20px]'} />
          )}
        </button>
      </div>
    </div>
  );
});
