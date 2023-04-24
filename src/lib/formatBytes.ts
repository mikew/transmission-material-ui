function formatBytes(bytes?: number | string, decimals = 2) {
  if (!bytes) {
    return '0 B'
  }

  bytes = Number(bytes)
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)

  return `${value.toFixed(decimals)} ${sizes[i]}`
}

export default formatBytes
