import React, { FC, useState } from 'react'

import graph from '../../../img/graph.png'
import styles from './Form.module.scss'
import FormInput from './form-input/FormInput'

const Form: FC = () => {
  const [input1, setInput1] = useState<number>(0)
  const [input2, setInput2] = useState<number>(0)
  const [input3, setInput3] = useState<number>(0)
  const [input4, setInput4] = useState<number>(0)
  const [input5, setInput5] = useState<number>(0)
  const [input6, setInput6] = useState<number>(0)
  const [input7, setInput7] = useState<number>(0)
  const [input8, setInput8] = useState<number>(0)
  const [input9, setInput9] = useState<number>(0)
  const [input10, setInput10] = useState<number>(0)

  return (
    <div className={styles.graph}>
      <img src={graph} alt='graph' className='w-72 mb-2' />
      <div className={styles.input}>
        <FormInput order={1} setInput={setInput1} />
        <FormInput order={2} setInput={setInput2} />
        <FormInput order={3} setInput={setInput3} />
        <FormInput order={4} setInput={setInput4} />
        <FormInput order={5} setInput={setInput5} />
        <FormInput order={6} setInput={setInput6} />
        <FormInput order={7} setInput={setInput7} />
        <FormInput order={8} setInput={setInput8} />
        <FormInput order={9} setInput={setInput9} />
        <FormInput order={10} setInput={setInput10} />
      </div>
      <button type='button' className={styles.button}>
        Send
      </button>
      <div className={styles.result}>
        <p>result</p>
      </div>
    </div>
  )
}

export default Form
