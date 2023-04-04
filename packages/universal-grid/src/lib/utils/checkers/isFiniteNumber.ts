export const isFiniteNumber = (value: unknown): value is number => {
  return Number.isFinite(value)
}
