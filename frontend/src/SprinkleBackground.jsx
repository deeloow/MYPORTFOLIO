import { useMemo } from 'react'
import './SprinkleBackground.css'

const PARTICLE_COUNT = 80
const PARTICLE_TYPES = [
  ['dot', 0.38],
  ['sparkle', 0.28],
  ['star', 0.16],
  ['glitter', 0.1],
  ['heart', 0.08],
]
const PARTICLE_COLORS = [
  'var(--sprinkle-pink)',
  'var(--sprinkle-lavender)',
  'var(--sprinkle-purple)',
  'var(--sprinkle-white)',
]

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function chooseType() {
  const roll = Math.random()
  let cumulativeWeight = 0
  for (const [type, weight] of PARTICLE_TYPES) {
    cumulativeWeight += weight
    if (roll < cumulativeWeight) return type
  }
  return 'dot'
}

export default function SprinkleBackground() {
  const particles = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const type = chooseType()
    const size = randomBetween(type === 'dot' || type === 'glitter' ? 2 : 7, type === 'dot' || type === 'glitter' ? 5 : 12)
    const duration = randomBetween(26, 48)
    const glow = Math.random() > 0.76
    const columns = 10
    const rows = Math.ceil(PARTICLE_COUNT / columns)
    const column = index % columns
    const row = Math.floor(index / columns)

    return {
      id: index,
      type,
      glow,
      style: {
        left: `${((column + randomBetween(0.12, 0.88)) / columns) * 100}%`,
        top: `${((row + randomBetween(0.12, 0.88)) / rows) * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size}px`,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        '--drift-x': `${randomBetween(-38, 38)}px`,
        '--drift-y': `${randomBetween(-54, 54)}px`,
        '--spin': `${randomBetween(-85, 85)}deg`,
        '--duration': `${duration}s`,
        '--delay': `${randomBetween(-duration, 0)}s`,
        '--twinkle-duration': `${randomBetween(3, 8)}s`,
        '--twinkle-delay': `${randomBetween(-8, 0)}s`,
        '--base-opacity': randomBetween(0.3, glow ? 0.68 : 0.5),
      },
    }
  }), [])

  return (
    <div className="sprinkle-background" aria-hidden="true">
      {particles.map(({ id, type, glow, style }) => (
        <span
          className={`sprinkle-particle sprinkle-${type}${glow ? ' sprinkle-glow' : ''}`}
          key={id}
          style={style}
        >
          {type === 'sparkle' ? '✦' : type === 'star' ? '✧' : type === 'heart' ? '♡' : type === 'glitter' ? '✣' : null}
        </span>
      ))}
    </div>
  )
}
