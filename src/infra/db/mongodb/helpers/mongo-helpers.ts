import { MongoClient, type Collection } from 'mongodb'

export const MONGO_HELPER = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (collectionName: string): Collection<Document> {
    return this.client.db().collection(collectionName)
  }
}
