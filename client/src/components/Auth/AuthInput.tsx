import { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form';
import TitleText from './TitleText';

interface IFormValues {
  [key: string]: string;
}

type Props<T> = {
  type: T;
  id: T;
  label?: T;
  style?: T;
  holder?: T;
  register: UseFormRegister<IFormValues>;
  registerOptions?: RegisterOptions;
  errors?: FieldErrors<IFormValues>;
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

  const a = 'border-gray-300 focus:border-purple-300';

  return (
    <div className={`flex flex-col ${style}`}>
      <label htmlFor={id}>{label && <TitleText text={label} style={'mb-14pxr'} />}</label>
      <input
        type={type}
        id={id}
        placeholder={holder}
        {...register(id, { ...registerOptions })}
        className={`border-[1.5px] rounded px-16pxr h-45pxr ${a}`}
      />
      {errorMessage && <span className='text-cherry'>{errorMessage}</span>}
    </div>
  );
}

export default AuthInput;
