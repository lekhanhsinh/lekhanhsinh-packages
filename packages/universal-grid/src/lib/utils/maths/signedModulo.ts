export const signedModulo = (dividend: number, divisor: number): number => {
  return ((dividend % divisor) + divisor) % divisor
}
