import { type AddAccount, type AddAccountModel } from '../../../domain/usecases/add-account'
import { type AccountModel } from '../../../domain/models/account'
import { type Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(addAccountModel.password)
    return await new Promise((resolve) => { resolve(null) })
  }
}
