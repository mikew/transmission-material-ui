const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24
// Approximate value for an average year
const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365.25

function formatTime(seconds: number | undefined = 0): string {
  const years = Math.floor(seconds / SECONDS_PER_YEAR)
  seconds %= SECONDS_PER_YEAR

  const days = Math.floor(seconds / SECONDS_PER_DAY)
  seconds %= SECONDS_PER_DAY

  const hours = Math.floor(seconds / SECONDS_PER_HOUR)
  seconds %= SECONDS_PER_HOUR

  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE)
  seconds %= SECONDS_PER_MINUTE

  const parts = []
  if (years > 0) {
    parts.push(`${years}y`)
  }
  if (days > 0) {
    parts.push(`${days}d`)
  }
  if (hours > 0) {
    parts.push(`${hours}h`)
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`)
  }
  if (seconds > 0) {
    parts.push(`${seconds}s`)
  }

  if (parts.length === 0) {
    return '0s'
  }

  if (parts.length === 1) {
    return parts[0]
  }

  return parts.join(', ')
}

export default formatTime
