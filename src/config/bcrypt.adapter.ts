import { compareSync, genSaltSync, hashSync } from "bcryptjs"

export default {
  hash: (password: string) => {
    const salt = genSaltSync()
    return hashSync(password, salt)
  },

  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed)
  },
}
