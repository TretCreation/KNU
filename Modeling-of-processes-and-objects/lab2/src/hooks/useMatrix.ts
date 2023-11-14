import { peaks, routes } from '../data/data'

// Function to create an adjacency matrix
function createAdjacencyMatrix(vertices: number, edges: [string, string][]): number[][] {
  // Initialize a matrix with all elements set to 0
  const matrix = Array.from({ length: vertices }, () => Array(vertices).fill(0))

  // Fill in the matrix based on the edges
  edges.forEach(([startVertex, endVertex]) => {
    const startIndex = peaks.indexOf(startVertex)
    const endIndex = peaks.indexOf(endVertex)
    matrix[startIndex][endIndex] = 1
    // Uncomment the following line if the graph is directed
    // matrix[endIndex][startIndex] = 1;
  })

  return matrix
}

function transposeMatrix(matrix: number[][]): number[][] {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
}

// Create an adjacency matrix
const adjacencyMatrix: number[][] = createAdjacencyMatrix(peaks.length, routes)
const transposedMatrix = transposeMatrix(adjacencyMatrix)

const useMatrix = () => {
  console.log('Adjacency Matrix:')
  return transposedMatrix
}

export default useMatrix
