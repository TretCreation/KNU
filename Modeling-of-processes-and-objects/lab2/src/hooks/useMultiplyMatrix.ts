function resultMatrices(vector: number[], matrix: number[][]): number[] {
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

function useMultiplyMatrix(matrix: number[][], vector: number[], iterations: number): number[][] {
  const resultArray: number[][] = []
  resultArray.unshift(vector.slice()) // Add the initial vector to the start

  let result = vector.slice() // Copy the initial vector

  for (let i = 0; i < iterations; i++) {
    result = resultMatrices(result, matrix)
    resultArray.push([...result]) // Save a copy of the current result in the array
  }

  // Transpose the resultArray
  const transposedResultArray = resultArray[0].map((col, i) => resultArray.map(row => row[i]))

  console.log('@@@@@@@//transposedResultArray', transposedResultArray)
  return transposedResultArray
}

export default useMultiplyMatrix
