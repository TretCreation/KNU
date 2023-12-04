function multiplyMatrix(vector: number[], matrix: number[][]): number[] {
  const result: number[] = []

  for (let i = 0; i < matrix.length; i++) {
    let sum = 0
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j] * vector[j]
    }
    result.push(sum)
  }

  return result
}

export default function multiplyMatrixByVector(
  matrix: number[][],
  vector: number[],
  iterations: number
): number[][] {
  const resultArray: number[][] = []
  let result = vector.slice() // Copy the initial vector

  for (let i = 0; i < iterations; i++) {
    result = multiplyMatrix(result, matrix)
    resultArray.push(result.slice()) // Save a copy of the current result in the array
  }

  return resultArray
}

// Example usage with your provided matrix and vector, saving each iteration's result
const matrix = [
  [0, 0, 0],
  [-1, 0, -1],
  [1, 1, 0]
]

const initialVector = [1, 0, 0]
const iterations = 9

const resultArray = multiplyMatrixByVector(matrix, initialVector, iterations)

console.log(resultArray)
