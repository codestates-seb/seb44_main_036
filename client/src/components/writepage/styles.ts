import { StylesConfig } from 'react-select';

export const style = {
  title: 'text-3xl font-extrabold text-purple-300 mb-5pxr',
  desc: 'font-light pb-15pxr',
  subTitle: 'text-2xl font-bold text-gray-900 my-10pxr',
  input: 'border border-solid rounded border-gray-400 py-5pxr px-10pxr focus:border-purple-300',
  fileInput:
    'border-b border-solid border-gray-400 w-[80%] py-5pxr mb-30pxr text-sm text-gray-900 focus:border-purple-300 file:py-3pxr file:px-15pxr file:rounded-full file:border-0 file:bg-purple-300 file:text-white file:mr-10pxr',
  tagInput: 'w-[80%] flex items-center overflow-hidden mb-10pxr',
  textarea: 'w-[80%] mb-30pxr outline-none h-150pxr',
  submitButton:
    'text-xl text-white bg-purple-300 rounded-full hover:bg-purple-400 w-300pxr h-50pxr my-40pxr',
  error: 'absolute bottom-5pxr text-red-500 text-sm',
  editor:
    'w-[80%] rounded focus-within:outline-[1px] focus-within:outline focus-within:outline-purple-300',
};

export const customStyles: StylesConfig = {
  control: (base, { isFocused }) => ({
    ...base,
    border: isFocused ? '1px solid #7A22C3' : '1px solid #D1D1D1',
    boxShadow: '',
    ':hover': { border: isFocused ? '1px solid #7A22C3' : '1px solid #D1D1D1' },
  }),
  option: (base, { isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? '#f1dfff' : 'transparent',
    color: isSelected ? '#7A22C3' : 'black',
    ':hover': {
      ...base[':hover'],
      backgroundColor: '#f1dfff',
      color: isSelected ? '#7A22C3' : 'black',
    },
  }),
};
