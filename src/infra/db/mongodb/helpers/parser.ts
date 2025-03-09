import { type OptionalId } from 'mongodb'
interface MongoModel<T> extends OptionalId<Document> {
  data: T
}
export const mapToMongo = <T>(data: any): MongoModel<T> => ({
  ...data
})
