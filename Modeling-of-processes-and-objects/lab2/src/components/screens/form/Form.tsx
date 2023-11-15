import React, { FC, useState } from 'react'

import useMatrix from '../../../hooks/useMatrix'
import graph from '../../../img/graph.png'
import styles from './Form.module.scss'
import FormButton from './form-button/FormButton'
import FormInput from './form-input/FormInput'

const Form: FC = () => {
  const [input, setInput] = useState<number>(0)
  const [value, setValue] = useState<number[]>([])
  const [col, setCol] = useState<number[]>([])

  console.log('col', col)
  console.log('input', input)
  // console.log(value)
  const adjMatrix: number[][] = useMatrix()

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <img src={graph} alt='graph' className='w-72 mb-2 mr-9' />
        <div className={styles.matrix}>
          {adjMatrix.map((row: number[], index: number) => (
            <p key={index}>{row.join(' ')}</p>
          ))}
        </div>
      </div>
      <div className={styles.inputs}>
        <div className={styles.buttons}>
          <FormButton item={1} setInput={setInput} setCol={setCol} />
          <FormButton item={2} setInput={setInput} setCol={setCol} />
          <FormButton item={3} setInput={setInput} setCol={setCol} />
          <FormButton item={4} setInput={setInput} setCol={setCol} />
          <FormButton item={5} setInput={setInput} setCol={setCol} />
          <FormButton item={6} setInput={setInput} setCol={setCol} />
          <FormButton item={7} setInput={setInput} setCol={setCol} />
          <FormButton item={8} setInput={setInput} setCol={setCol} />
          <FormButton item={9} setInput={setInput} setCol={setCol} />
          <FormButton item={10} setInput={setInput} setCol={setCol} />
        </div>
        <div className={styles.value}>
          <FormInput setValue={setValue} />
          {value.map((v: number, index: number) => (
            <p key={index}>{v}</p>
          ))}
        </div>
      </div>
      <button
        type='button'
        className='bg-red-500 hover:bg-red-700 text-white-main font-bold py-2 px-4 rounded mt-4'
      >
        Result
      </button>
      <div className={styles.result}>
        <p>result</p>
      </div>
    </div>
  )
}

export default Form
