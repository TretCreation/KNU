import { StateProbabilities, TransitionRates } from '../interfaces/math.interface'

function calculateLimitingProbabilities(
  rates: TransitionRates,
  Y0: number[],
  tStart: number,
  tEnd: number,
  dt: number
): StateProbabilities {
  const systemOfEquations = (t: number, Y: number[]) => [
    rates.lambda01 * Y[1] + rates.lambda02 * Y[2] - rates.mu10 * Y[0],
    rates.mu10 * Y[0] - (rates.lambda01 + rates.mu13 + rates.mu20 + rates.mu23) * Y[1],
    rates.mu20 * Y[0] + rates.mu23 * Y[1] - (rates.lambda02 + rates.mu31 + rates.mu32) * Y[2],
    rates.mu31 * Y[2] +
      rates.mu32 * Y[2] -
      rates.lambda13 * Y[3] -
      rates.lambda23 * Y[3] -
      rates.lambda32 * Y[3]
  ]

  const results = []
  let currentState = Y0.slice()

  for (let t = tStart; t <= tEnd; t += dt) {
    const derivatives = systemOfEquations(t, currentState)
    currentState = currentState.map((value, index) => value + derivatives[index] * dt)
    results.push([...currentState]) // Use spread operator to clone the array
  }

  const lastState = results[results.length - 1]

  const sum = lastState.reduce((acc, val) => acc + val, 0)

  const state: StateProbabilities = {
    p0: lastState[0] / sum,
    p1: lastState[1] / sum,
    p2: lastState[2] / sum,
    p3: lastState[3] / sum
  }

  return state
}

export default function useMath({
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
}: TransitionRates) {
  const userRates: TransitionRates = {
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
  }

  const userInitialProbabilities: number[] = [1, 0, 0, 0]

  const limitingProbabilities = calculateLimitingProbabilities(
    userRates,
    userInitialProbabilities,
    userTStart,
    userTEnd,
    userDt
  )

  return limitingProbabilities
}
