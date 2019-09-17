export interface DropZoneFile {
  item: DataTransferItem
  reader: () => Promise<string>
}

export default function getFilesFromEvent(
  dataTransfer: React.DragEvent['dataTransfer'],
) {
  const items: DropZoneFile[] = []

  for (const item of Array.from(dataTransfer.items)) {
    let reader: DropZoneFile['reader'] | undefined
    if (item.kind === 'file') {
      reader = buildFileReader(item.getAsFile())
    } else {
      reader = buildStringReader(item)
    }

    items.push({
      item,
      reader,
    })
  }

  return items
}

function buildFileReader(file: File | null) {
  if (!file) {
    return () => Promise.resolve('')
  }

  return () => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result! as string)
      reader.onabort = () => reject(new Error())
      reader.onerror = () => reject(new Error())
      // reader.readAsText(file)
      reader.readAsDataURL(file)
    })
  }
}

function buildStringReader(item: DataTransferItem) {
  return () => {
    return new Promise<string>((resolve) => {
      item.getAsString(resolve)
    })
  }
}
