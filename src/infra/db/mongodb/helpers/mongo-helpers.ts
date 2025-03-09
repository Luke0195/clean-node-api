import { MongoClient, type Collection } from 'mongodb'
import { run } from 'node:test'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    if (this.client !== null) {
      await this.client.close()
      this.client = null
    }
  },

  async getCollection (collectionName: string): Promise<Collection<Document>> {
    if (this.client === null) {
      await this.connect(this.url)
    }
    return this.client.db().collection(collectionName)
  }
}
