import { type AddAccount, type Encrypter, type AccountModel, type AddAccountModel, type AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository) {}

  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(addAccountModel.password)
    await this.addAccountRepository.add(Object.assign({}, addAccountModel, { password: hashedPassword }))
    return await new Promise((resolve) => { resolve(null) })
  }
}
