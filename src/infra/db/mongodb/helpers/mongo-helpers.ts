import { MongoClient, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    if (this.client !== null) {
      await this.client.close()
    }
  },

  getCollection (collectionName: string): Collection<Document> {
    return this.client.db().collection(collectionName)
  }
}
