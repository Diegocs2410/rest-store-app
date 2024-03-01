import { regularExps } from "../../../config"

class RegisterUserDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { name, email, password } = obj
    if (!name) return ["Missing name"]
    if (!email) return ["Missing email"]
    if (!regularExps.email.test(email)) return ["Email does not validated"]
    if (!password) return ["Missing password"]
    if (password.length < 6) return ["Password too short"]

    return [undefined, new RegisterUserDTO(name, email, password)]
  }
}
