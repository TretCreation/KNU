import React, { FC, useState } from 'react'

import styles from './FormInput.module.scss'

interface IFormInput {
  order: number
  setInput: React.Dispatch<React.SetStateAction<number>>
}

const FormInput: FC<IFormInput> = ({ order, setInput }) => (
  <div className={styles.input}>
    <p className={styles.p}>{order}</p>
    <input
      type='text'
      placeholder='0-10'
      className={styles.solid}
      onChange={e => setInput(Number(e.target.value))}
    />
  </div>
)

export default FormInput
