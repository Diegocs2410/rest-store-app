import { regularExps } from "../../../config"

class LoginUserDTO {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { email, password } = obj
    if (!email) return ["Missing email"]
    if (!regularExps.email.test(email)) return ["Email does not validated"]
    if (!password) return ["Missing password"]
    if (password.length < 6) return ["Password too short"]

    return [undefined, new LoginUserDTO(email, password)]
  }
}

export default LoginUserDTO
