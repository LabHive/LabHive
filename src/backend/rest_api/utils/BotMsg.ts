import { IUserCommon } from 'backend/lib/database/schemas/IUserCommon'
import { UserRoles } from 'lib/userRoles'

let users = {
  "Kavakuo": "<@312968104550596608>"
}


export class BotMsg {

  private static sendMsg(msg: String) {

  }

  static error(msg: string) {
    this.sendMsg(`${users.Kavakuo} ${msg}!`)
  }

  static newUser(user: IUserCommon) {
    if (user.role === UserRoles.VOLUNTEER) {
      this.sendMsg(`New volunteer just registered!`)
    }
    else if (user.role === UserRoles.LAB_DIAG) {
      this.sendMsg(`@everyone New diagnostic center just registered, let's verify it!\n\tSlugID: \`${user.slug}\``)
    }
    else {
      this.sendMsg(`@everyone New research lab just registered, let's verify it!\n\tSlugID: \`${user.slug}\``)
    }
  }
}