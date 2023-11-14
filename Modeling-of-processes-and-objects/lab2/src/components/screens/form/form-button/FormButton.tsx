import React, { FC } from 'react'

import styles from './FormButton.module.scss'

interface IFormButton {
  input: number
  setInput: React.Dispatch<React.SetStateAction<number>>
}

const FormButton: FC<IFormButton> = ({ input, setInput }) => (
  <button type='button' className={styles.button} onClick={() => setInput(input)}>
    {input}
  </button>
)

export default FormButton
