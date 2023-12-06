export interface StateProbabilities {
  p0: number
  p1: number
  p2: number
  p3: number
}

export interface TransitionRates {
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
  userTStart: number
  userTEnd: number
  userDt: number
}
