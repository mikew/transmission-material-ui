function convertFilesToGroup(files: TransmissionTorrent['files'] = []) {
  if (files.length === 0) {
    return emptyDirSpec
  }

  if (files.length === 1 && !files[0].name.includes('/')) {
    const fileSpec: FileSpec = {
      ...files[0],
      type: 'file',
      index: 0,
    }

    return fileSpec
  }

  let dirCache: Record<string, DirSpec> = {}

  files.forEach((file, fileIndex) => {
    const dirParts = file.name.split('/')
    const fileName = dirParts.pop()

    if (!fileName) {
      return
    }

    for (let i = 0; i < dirParts.length; i += 1) {
      const key = dirParts.slice(0, i + 1).join('/')

      // If the directory is not in the cache, create it.
      let didCreate = false
      if (!dirCache[key]) {
        dirCache[key] = {
          type: 'directory',
          name: dirParts[i],
          children: [],
        }
        didCreate = true
      }

      // If we just created an entry in the cache, associate it with its parent.
      // Need to check that we're not doing this on the first entry, hence the
      // i > 0 check
      if (didCreate && i > 0) {
        const parentKey = dirParts.slice(0, i).join('/')
        dirCache[parentKey].children.push(dirCache[key])
      }
    }

    const dirObj = dirCache[dirParts.join('/')]

    const fileSpec: FileSpec = {
      ...file,
      type: 'file',
      name: fileName,
      index: fileIndex,
    }

    dirObj.children.push(fileSpec)
  })

  const firstDir = files[0].name.split('/')[0]
  const result = dirCache[firstDir]
  dirCache = {}

  return result
}

export interface FileSpec extends TransmissionFile {
  type: 'file'
  index: number
}

export interface DirSpec {
  type: 'directory'
  children: (DirSpec | FileSpec)[]
  name: string
}

const emptyDirSpec: DirSpec = {
  type: 'directory',
  children: [],
  name: '',
}

export default convertFilesToGroup
