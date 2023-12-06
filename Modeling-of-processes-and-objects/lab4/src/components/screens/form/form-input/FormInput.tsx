import React, { ChangeEvent, FC } from 'react'

interface IFormInputProps {
  title: string
  setInput: (value: number) => void
  value: number
}

const FormInput: FC<IFormInputProps> = ({ title, setInput, value }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value)
    setInput(inputValue)
  }

  return (
    <div className='flex flex-row'>
      <label className='mr-2 my-2'>{title}:</label>
      <input type='text' placeholder={title} onChange={handleInputChange} value={value.toString()} />
    </div>
  )
}

export default FormInput
