function useTransposeMatrixOpposite(matrix: number[][]): number[][] {
  return matrix.map((row, i) => matrix[0].map((_, j) => matrix[j][i]))
}

export default useTransposeMatrixOpposite
