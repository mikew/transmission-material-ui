export interface DropZoneFile {
  text?: string
  file?: File
}

export default function getFilesFromEvent(
  dataTransfer: React.DragEvent['dataTransfer'],
): DropZoneFile[] {
  const text = dataTransfer.getData('text')
  if (text) {
    return [{ text }]
  }

  return Array.from(dataTransfer.files).map((file) => ({ file }))
}
