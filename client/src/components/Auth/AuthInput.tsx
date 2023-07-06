import { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form';
import { ReactComponent as WarningSvg } from '@/assets/icons/warnig_icon.svg';
import TitleText from '../ui/TitleText';
import { FormValues } from '@/common/types/authTypes';

type Props<T> = {
  type: T;
  id: 'email' | 'nickname' | 'password' | 'passwordCheck';
  label?: T;
  style?: T;
  holder?: T;
  register: UseFormRegister<FormValues>;
  registerOptions?: RegisterOptions;
  errors?: FieldErrors<FormValues>;
};

function AuthInput({
  register,
  errors,
  registerOptions,
  type,
  id,
  label,
  style,
  holder,
}: Props<string>) {
  const errorMessage = errors && errors[id]?.message;

  const borderStyle = () => {
    return errorMessage ? 'border-cherry' : 'border-gray-300 focus:border-purple-300';
  };

  return (
    <div className={`flex flex-col ${style}`}>
      <label htmlFor={id}>{label && <TitleText text={label} style={'mb-12pxr'} />}</label>
      <div className='relative flex'>
        <input
          type={type}
          id={id}
          placeholder={holder}
          {...register(id, { ...registerOptions })}
          className={`border-[1.5px] w-full rounded px-16pxr h-45pxr ${borderStyle()}`}
        />
        {errorMessage && <WarningSvg className='absolute right-16pxr top-10pxr' />}
      </div>
      {errorMessage && <span className='text-xs text-cherry ml-16pxr mt-8pxr'>{errorMessage}</span>}
    </div>
  );
}

export default AuthInput;
