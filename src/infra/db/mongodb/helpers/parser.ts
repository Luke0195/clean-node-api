import { type OptionalId } from 'mongodb'
interface MongoAccountModel extends OptionalId<Document> {
  name: string
  email: string
  password: string
}
export const mapToMongo = (data: any): MongoAccountModel => ({
  ...data
})
