import { all, create } from 'mathjs'

const math = create(all)

interface StateProbabilities {
  S1: number
  S2: number
  S3: number
  S4: number
  S5: number
}

interface IntensityFunctions {
  [key: string]: (t: number) => number
}

function calculateLimitingProbabilities(intensities: IntensityFunctions): StateProbabilities {
  const systemOfEquations = (t: number, Y: number[]) => [
    intensities.S2toS1(t) * Y[1] - intensities.S1toS2(t) * Y[0],
    intensities.S3toS1(t) * Y[2] +
      intensities.S4toS1(t) * Y[3] +
      intensities.S5toS1(t) * Y[4] -
      (intensities.S1toS3(t) + intensities.S2toS3(t)) * Y[1],
    intensities.S2toS1(t) * Y[1] - intensities.S1toS2(t) * Y[2],
    intensities.S2toS1(t) * Y[1] - intensities.S1toS2(t) * Y[3],
    intensities.S3toS1(t) * Y[2] + intensities.S4toS1(t) * Y[3] - intensities.S1toS3(t) * Y[4]
  ]

  const Y0 = [1, 0, 0, 0, 0]
  const tStart = 0
  const tEnd = 100
  const dt = 0.1

  const results = []
  let currentState = Y0.slice()

  for (let t = tStart; t <= tEnd; t += dt) {
    const derivatives = systemOfEquations(t, currentState)
    currentState = currentState.map((value, index) => value + derivatives[index] * dt)
    results.push(currentState.slice())
  }

  const lastState = results[results.length - 1]

  const state: StateProbabilities = {
    S1: lastState[0],
    S2: lastState[1],
    S3: lastState[2],
    S4: lastState[3],
    S5: lastState[4]
  }

  return state
}

async function main() {
  const intensities: IntensityFunctions = {
    S2toS1: t => 0.1,
    S1toS2: t => 0.2,
    S3toS1: t => 0.3,
    S4toS1: t => 0.4,
    S5toS1: t => 0.5,
    S1toS3: t => 0.6,
    S2toS3: t => 0.7
  }

  const limitingProbabilities = calculateLimitingProbabilities(intensities)
  console.log('Limiting Probabilities:', limitingProbabilities)
}

main()
