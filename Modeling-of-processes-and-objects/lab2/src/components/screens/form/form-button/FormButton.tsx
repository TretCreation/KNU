import React, { FC, useEffect } from 'react'

import styles from './FormButton.module.scss'

interface IFormButton {
  item: number
  array: number[][]
  setCol: React.Dispatch<React.SetStateAction<number[]>>
}

const FormButton: FC<IFormButton> = ({ item, array, setCol }) => {
  const onAddSubmit = (item: number) => {
    switch (item) {
      case 1:
        setCol([1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        break
      case 2:
        setCol([0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
        break
      case 3:
        setCol([0, 0, 1, 0, 0, 0, 0, 0, 0, 0])
        break
      case 4:
        setCol([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])
        break
      case 5:
        setCol([0, 0, 0, 0, 1, 0, 0, 0, 0, 0])
        break
      case 6:
        setCol([0, 0, 0, 0, 0, 1, 0, 0, 0, 0])
        break
      case 7:
        setCol([0, 0, 0, 0, 0, 0, 1, 0, 0, 0])
        break
      case 8:
        setCol([0, 0, 0, 0, 0, 0, 0, 1, 0, 0])
        break
      case 9:
        setCol([0, 0, 0, 0, 0, 0, 0, 0, 1, 0])
        break
      case 10:
        setCol([0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
        break
      default:
        break
    }
  }

  return (
    <button type='button' className={styles.button} onClick={() => onAddSubmit(item)}>
      {item}
    </button>
  )
}
export default FormButton
