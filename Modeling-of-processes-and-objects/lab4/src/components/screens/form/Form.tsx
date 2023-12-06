import React, { FC, useEffect, useState } from 'react'

import { StateProbabilities } from '@/src/interfaces/math.interface'

import useMath from '../../../hooks/useMath'
import FormInput from './form-input/FormInput'

const Form: FC = () => {
  const [lambda01, useLambda01] = useState<any>(0.1)
  const [lambda02, useLambda02] = useState<any>(0.2)
  const [lambda13, useLambda13] = useState<any>(0.3)
  const [lambda23, useLambda23] = useState<any>(0.4)
  const [lambda32, useLambda32] = useState<any>(0.5)
  const [mu10, useMu10] = useState<any>(0.6)
  const [mu13, useMu13] = useState<any>(0.7)
  const [mu20, useMu20] = useState<any>(0.8)
  const [mu23, useMu23] = useState<any>(0.9)
  const [mu31, useMu31] = useState<any>(1)
  const [mu32, useMu32] = useState<any>(1.1)
  const [userTStart, useUserTStart] = useState<any>(0)
  const [userTEnd, useUserTEnd] = useState<any>(100)
  const [userDt, useUserDt] = useState<any>(0.1)
  const [limitingProbabilities, setLimitingProbabilities] = useState<StateProbabilities | null>(null)
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)

  useEffect(() => {
    if (buttonClicked) {
      try {
        const result = useMath({
          lambda01,
          lambda02,
          lambda13,
          lambda23,
          lambda32,
          mu10,
          mu13,
          mu20,
          mu23,
          mu31,
          mu32,
          userTStart,
          userTEnd,
          userDt
        })

        setLimitingProbabilities(result)
      } catch (error) {
        console.error('Error in useMath:', error)
      }
    }
  }, [buttonClicked, lambda01, lambda02, lambda13, lambda23, lambda32, mu10, mu13, mu20, mu23, mu31, mu32, userDt, userTEnd, userTStart])

  return (
    <>
      <div>
        <FormInput title='lambda01' setInput={useLambda01} value={lambda01} />
        <FormInput title='lambda02' setInput={useLambda02} value={lambda02} />
        <FormInput title='lambda13' setInput={useLambda13} value={lambda13} />
        <FormInput title='lambda23' setInput={useLambda23} value={lambda23} />
        <FormInput title='lambda32' setInput={useLambda32} value={lambda32} />
        <FormInput title='mu10' setInput={useMu10} value={mu10} />
        <FormInput title='mu13' setInput={useMu13} value={mu13} />
        <FormInput title='mu20' setInput={useMu20} value={mu20} />
        <FormInput title='mu23' setInput={useMu23} value={mu23} />
        <FormInput title='mu31' setInput={useMu31} value={mu31} />
        <FormInput title='mu32' setInput={useMu32} value={mu32} />
        <FormInput title='userTStart' setInput={useUserTStart} value={userTStart} />
        <FormInput title='userTEnd' setInput={useUserTEnd} value={userTEnd} />
        <FormInput title='userDt' setInput={useUserDt} value={userDt} />
      </div>
      <button onClick={() => setButtonClicked(!buttonClicked)}>Calculate</button>
      <div>
        {limitingProbabilities && (
          <div>
            <br />
            <h2>Limiting Probabilities:</h2>
            <p>p0: {limitingProbabilities.p0}</p>
            <p>p1: {limitingProbabilities.p1}</p>
            <p>p2: {limitingProbabilities.p2}</p>
            <p>p3: {limitingProbabilities.p3}</p>
            <br />
            <p>Sim: {limitingProbabilities.p0 + limitingProbabilities.p1 + limitingProbabilities.p2 + limitingProbabilities.p3}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Form
