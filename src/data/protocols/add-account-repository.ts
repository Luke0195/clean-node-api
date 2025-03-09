import { type AccountModel, type AddAccountModel } from '../usecases/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add: (addAccountModel: AddAccountModel) => Promise<AccountModel>
}
