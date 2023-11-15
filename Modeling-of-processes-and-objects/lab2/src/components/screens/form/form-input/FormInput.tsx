import React, { FC } from 'react'

import styles from './FormInput.module.scss'

interface IFormInputProps {
  setValue: React.Dispatch<React.SetStateAction<number[]>>
}

const FormInput: FC<IFormInputProps> = ({ setValue }) => (
  <input
    type='text'
    placeholder='0 0 0'
    className={styles.main}
    onChange={e => {
      const inputNumbers = e.target.value.split(' ').map(Number)
      setValue(() => [...inputNumbers])
    }}
  />
)

export default FormInput
