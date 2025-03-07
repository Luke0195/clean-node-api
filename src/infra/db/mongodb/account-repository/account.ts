import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helpers'
import { mapToMongo } from '../helpers/parser'

export class AccountMongoRepository implements AddAccountRepository {
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const parseAccountToMongoAccount = mapToMongo(addAccountModel)
    const result = await accountCollection.insertOne(parseAccountToMongoAccount)
    const account: AccountModel = Object.assign({}, addAccountModel, { id: result.insertedId.toString() })
    return account
  }
}
