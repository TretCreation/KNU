function useTransposeMatrix(matrix: number[][]): number[][] {
  return matrix.map((col, i) => matrix.map(row => row[i]))
}

export default useTransposeMatrix
