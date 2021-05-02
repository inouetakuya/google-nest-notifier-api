// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import { getMulticastDnsDataByDeviceName } from './lib/multicastDnsService'

type NotificationOptions = {
  deviceName?: string
  ipAddress?: string
  language?: string
}

export class GoogleNestNotifier {
  private readonly defaultDeviceName: string = ''
  private readonly defaultIpAddress: string = ''
  private readonly defaultLanguage: string = ''
  private client: castv2.Client

  constructor(
    { deviceName, ipAddress, language }: NotificationOptions,
    client = new castv2.Client()
  ) {
    if (deviceName) this.defaultDeviceName = deviceName
    if (ipAddress) this.defaultIpAddress = ipAddress
    if (language) this.defaultLanguage = language
    this.client = client // Dependency injection for testing
  }

  connect(ipAddress: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.on('error', (error: Error) => {
        reject(error)
      })
      this.client.connect(ipAddress, () => {
        resolve(true)
      })
    })
  }

  async notify(
    message: string,
    { deviceName, ipAddress, language }: NotificationOptions = {}
  ): Promise<boolean> {
    if (
      !(
        deviceName ||
        ipAddress ||
        this.defaultDeviceName ||
        this.defaultIpAddress
      )
    )
      throw new Error('Neither deviceName nor ipAddress is assigned')

    const _ipAddress =
      ipAddress ||
      this.defaultIpAddress ||
      (await this.getIpAddress(deviceName || this.defaultDeviceName))

    await this.client.connect(_ipAddress)

    return true
  }

  async getIpAddress(deviceName: string): Promise<string> {
    const multicastDnsData = await getMulticastDnsDataByDeviceName(deviceName)
    if (!multicastDnsData) throw new Error('Google Nest device is not found')
    return multicastDnsData.ipAddress
  }
}
