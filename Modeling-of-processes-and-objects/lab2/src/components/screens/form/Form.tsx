import React, { FC, useState } from 'react'

import useMatrix from '../../../hooks/useMatrix'
import graph from '../../../img/graph.png'
import styles from './Form.module.scss'
import FormButton from './form-button/FormButton'

const Form: FC = () => {
  const [input, setInput] = useState<number>(0)
  // console.log(useMatrix())

  const adjMatrix: number[][] = useMatrix()

  return (
    <div className={styles.graph}>
      <img src={graph} alt='graph' className='w-72 mb-2' />
      <div className={styles.input}>
        <FormButton input={1} setInput={setInput} />
        <FormButton input={2} setInput={setInput} />
        <FormButton input={3} setInput={setInput} />
        <FormButton input={4} setInput={setInput} />
        <FormButton input={5} setInput={setInput} />
        <FormButton input={6} setInput={setInput} />
        <FormButton input={7} setInput={setInput} />
        <FormButton input={8} setInput={setInput} />
        <FormButton input={9} setInput={setInput} />
        <FormButton input={10} setInput={setInput} />
      </div>
      <button
        type='button'
        className='bg-red-500 hover:bg-red-700 text-white-main font-bold py-2 px-4 rounded mt-4'
      >
        Result
      </button>
      <div className={styles.result}>
        <p>result</p>
        {adjMatrix.map((row: number[], index: number) => (
          <p key={index}>{row.join(' ')}</p>
        ))}
      </div>
    </div>
  )
}

export default Form
