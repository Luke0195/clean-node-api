import { type AddAccount, type Encrypter, type AccountModel, type AddAccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(addAccountModel.password)
    return await new Promise((resolve) => { resolve(null) })
  }
}
