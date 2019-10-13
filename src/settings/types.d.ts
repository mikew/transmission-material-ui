interface TorrentGroupDefinition {
  groupName: string
  location: string
}

interface TransmissionCustomSettings {
  groups?: Record<string, string[]>
}
