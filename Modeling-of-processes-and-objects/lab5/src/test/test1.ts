// Зчитуємо вхідні значення від користувача
const numColors = 10
const brightness = 10
const A = 10
const B = 10

export default function chooseBackgroundColor(numColors: number, brightness: number): number {
  // Визначаємо коефіцієнти для нечіткого регулятора
  const k1 = 0.3
  const k2 = 0.5
  const k3 = 0.7
  const k4 = 0.4
  const k5 = 0.6

  // Визначаємо ступені приналежності для кожного правила
  const rule1: number = Math.min(numColors / A, brightness / B)
  const rule2: number = Math.min(1, brightness / B)
  const rule3: number = Math.min(numColors / A, 1 - brightness / B)
  const rule4: number = Math.min(1, brightness / B)
  const rule5: number = Math.min(1 - numColors / A, brightness / B)

  // Визначаємо ваговані значення для кожного правила
  const weightedValues: number[] = [rule1 * k1, rule2 * k2, rule3 * k3, rule4 * k4, rule5 * k5]

  // Обчислюємо вихідну змінну
  const outputValue: number =
    weightedValues.reduce((sum, value) => sum + value, 0) /
    weightedValues.reduce((sum, _) => sum + 1, 0)

  // Обмежуємо значення в діапазоні від 0 до 100
  const boundedOutputValue: number = Math.max(0, Math.min(100, outputValue * 100))

  return boundedOutputValue
}

// Викликаємо функцію для визначення вихідної змінної
const outputValue: number = chooseBackgroundColor(numColors, brightness)

// Виводимо результат
console.log(`Значення вихідної змінної: ${outputValue}`)
