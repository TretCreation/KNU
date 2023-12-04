import React, { FC, useEffect, useState } from 'react'

import useMatrix from '../../../hooks/useMatrix'
import useMultiplyMatrix from '../../../hooks/useMultiplyMatrix'
import useTransposeMatrix from '../../../hooks/useTransposeMatrix'
import useTransposeMatrixOpposite from '../../../hooks/useTransposeMatrixOpposite'
import graph from '../../../img/graph.png'
import MyChart from '../graph/Graph'
import Table from '../table/Table'
import styles from './Form.module.scss'
import FormButton from './form-button/FormButton'
import FormInput from './form-input/FormInput'

const Form: FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([])
  const [col, setCol] = useState<number[]>([])
  const [show, setShow] = useState<boolean>(false)
  // const [input, setInput] = useState<number[][]>([])
  // const [value, setValue] = useState<number[]>([])

  const adjMatrix: number[][] = useMatrix()
  const resultMatrix: number[][] = useTransposeMatrix(adjMatrix)
  const transposedMatrix: number[][] = useTransposeMatrixOpposite(matrix)

  console.log('matrix', matrix)
  console.log('adjMatrix', adjMatrix)
  console.log('resultMatrix', resultMatrix)
  console.log('transposedMatrix', transposedMatrix)

  useEffect(() => {
    setMatrix(useMultiplyMatrix(adjMatrix, col, 9))
  }, [adjMatrix, col])

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <img src={graph} alt='graph' className='w-72 mb-2 mr-9' />
        <div className={styles.matrix}>
          <Table array={resultMatrix} />
        </div>
      </div>
      <div className={styles.inputs}>
        <div className={styles.buttons}>
          <FormButton item={1} array={adjMatrix} setCol={setCol} />
          <FormButton item={2} array={adjMatrix} setCol={setCol} />
          <FormButton item={3} array={adjMatrix} setCol={setCol} />
          <FormButton item={4} array={adjMatrix} setCol={setCol} />
          <FormButton item={5} array={adjMatrix} setCol={setCol} />
          <FormButton item={6} array={adjMatrix} setCol={setCol} />
          <FormButton item={7} array={adjMatrix} setCol={setCol} />
          <FormButton item={8} array={adjMatrix} setCol={setCol} />
          <FormButton item={9} array={adjMatrix} setCol={setCol} />
          <FormButton item={10} array={adjMatrix} setCol={setCol} />
        </div>
        {/* <div className={styles.value}>
          <FormInput setValue={setValue} />
          {value.map((v: number, index: number) => (
            <p key={index}>{v}</p>
          ))}
        </div> */}
      </div>
      <button
        type='button'
        className='bg-red-500 hover:bg-red-700 text-white-main font-bold py-2 px-4 rounded mt-4'
        onClick={() => setShow(!show)}
      >
        Result
      </button>
      <div className={styles.result}>
        {show && (
          <div className={styles.matrix}>
            <Table array={matrix} />
          </div>
        )}
      </div>
      <div className={styles.graph}>
        <MyChart data={transposedMatrix} />
      </div>
    </div>
  )
}

export default Form
