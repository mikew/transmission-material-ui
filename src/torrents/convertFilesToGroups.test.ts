import convertFilesToGroup from './convertFilesToGroup'
// import demoFilesJson from './demoFiles.json'

describe('convertFilesToGroup', () => {
  it('works', () => {
    // console.log(
    //   JSON.stringify(convertFilesToGroup(demoFilesJson), undefined, 4),
    // )
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(convertFilesToGroup(data), undefined, 4))
  })
})

const data: TransmissionTorrent['files'] = [
  {
    name: 'foo/bar/baz.txt',
    bytesCompleted: 0,
    length: 0,
  },
  {
    name: 'foo/bar/qux.txt',
    bytesCompleted: 0,
    length: 0,
  },
  {
    name: 'foo/hello world.txt',
    bytesCompleted: 0,
    length: 0,
  },
  {
    name: 'foo/bar/baz/hidden.txt',
    bytesCompleted: 0,
    length: 0,
  },
]
