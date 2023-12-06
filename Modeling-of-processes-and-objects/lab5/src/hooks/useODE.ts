import { all, create } from 'mathjs'

const math = create(all)

interface StateProbabilities {
  p0: number
  p1: number
  p2: number
  p3: number
}

interface TransitionRates {
  lambda01: number
  lambda02: number
  lambda13: number
  lambda23: number
  lambda32: number
  mu10: number
  mu13: number
  mu20: number
  mu23: number
  mu31: number
  mu32: number
}

function calculateLimitingProbabilities(
  rates: TransitionRates,
  Y0: number[],
  tStart: number,
  tEnd: number,
  dt: number
): StateProbabilities {
  // TODO: (Y)???? mb change name file
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
    results.push(currentState.slice())
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

async function main() {
  // Get user-provided parameters from the command line or any other input method
  const userRates: TransitionRates = {
    lambda01: parseFloat(process.argv[2]) || 0.7,
    lambda02: parseFloat(process.argv[3]) || 0.8,
    lambda13: parseFloat(process.argv[4]) || 0.3,
    lambda23: parseFloat(process.argv[5]) || 0.4,
    lambda32: parseFloat(process.argv[6]) || 0.5,
    mu10: parseFloat(process.argv[7]) || 0.6,
    mu13: parseFloat(process.argv[8]) || 0.2,
    mu20: parseFloat(process.argv[9]) || 0.8,
    mu23: parseFloat(process.argv[10]) || 0.9,
    mu31: parseFloat(process.argv[11]) || 1.0,
    mu32: parseFloat(process.argv[12]) || 1.3
  }

  const userInitialProbabilities: number[] = [1, 0, 0, 0]
  const userTStart: number = parseFloat(process.argv[13]) || 0
  const userTEnd: number = parseFloat(process.argv[14]) || 100
  const userDt: number = parseFloat(process.argv[15]) || 0.1

  const limitingProbabilities = calculateLimitingProbabilities(
    userRates,
    userInitialProbabilities,
    userTStart,
    userTEnd,
    userDt
  )

  console.log('Limiting Probabilities:', limitingProbabilities)
}

// Execute the main function
main()
