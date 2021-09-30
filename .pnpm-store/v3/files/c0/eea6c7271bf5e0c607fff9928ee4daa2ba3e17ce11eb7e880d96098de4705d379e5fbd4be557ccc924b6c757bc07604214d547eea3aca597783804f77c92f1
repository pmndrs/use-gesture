export function springFn(tension: number, friction: number, mass = 1) {
  const w0 = Math.sqrt(tension / mass) / 1000 // angular frequency in rad/ms
  const zeta = friction / (2 * Math.sqrt(tension * mass)) // damping ratio

  const w1 = w0 * Math.sqrt(1.0 - zeta * zeta) // exponential decay
  const w2 = w0 * Math.sqrt(zeta * zeta - 1.0) // frequency of damped oscillation

  const v_0 = 0

  const to = 1
  const from = 0
  const x_0 = to - from

  if (zeta < 1) {
    // Under damped
    return (t: number) =>
      to - Math.exp(-zeta * w0 * t) * (((-v_0 + zeta * w0 * x_0) / w1) * Math.sin(w1 * t) + x_0 * Math.cos(w1 * t))
  } else if (zeta === 1) {
    // Critically damped
    return (t: number) => to - Math.exp(-w0 * t) * (x_0 + (-v_0 + w0 * x_0) * t)
  } else {
    // Overdamped
    return (t: number) =>
      to -
      (Math.exp(-zeta * w0 * t) * ((-v_0 + zeta * w0 * x_0) * Math.sinh(w2 * t) + w2 * x_0 * Math.cosh(w2 * t))) / w2
  }
}
