import { peaks, routes } from '../data/data'

// Function to create an adjacency matrix
function createAdjacencyMatrix(vertices: number, edges: [string, string, string][]): number[][] {
  // Initialize a matrix with all elements set to 0
  const matrix = Array.from({ length: vertices }, () => Array(vertices).fill(0))

  // Fill in the matrix based on the edges
  edges.forEach(([startVertex, endVertex, weight]) => {
    const startIndex = peaks.indexOf(startVertex)
    const endIndex = peaks.indexOf(endVertex)
    matrix[startIndex][endIndex] = weight === '+' ? 1 : weight === '-' ? -1 : 0
  })

  return matrix
}

// Create an adjacency matrix
const adjacencyMatrix: number[][] = createAdjacencyMatrix(peaks.length, routes)
// const transposedMatrix = transposeMatrix(adjacencyMatrix)

const useMatrix = () => adjacencyMatrix

export default useMatrix
