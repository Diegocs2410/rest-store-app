import bcryptAdapter from "../../config/bcrypt.adapter"
import { UserModel } from "../../data"
import jwt from "jsonwebtoken"
import {
  CustomErrors,
  LoginUserDTO,
  RegisterUserDTO,
  UserEntity,
} from "../../domain"
import JwtAdapter from "../../config/jwt.adapter"

class AuthService {
  constructor() {}

  public async registerUser(registerUserDTO: RegisterUserDTO) {
    const existUser = await UserModel.findOne({ email: registerUserDTO.email })
    if (existUser) throw CustomErrors.badRequest("Email already exists")

    try {
      const user = new UserModel(registerUserDTO)

      // Encrypt Password
      user.password = bcryptAdapter.hash(registerUserDTO.password)
      await user.save()
      // JWT to authenticate

      // Confirmation Email

      const { password, ...rest } = UserEntity.fromObject(user)

      return {
        user: rest,
        token: "ABC",
      }
    } catch (error) {
      throw CustomErrors.internalServer(`${error}`)
    }
  }

  public async loginUser(loginUserDTO: LoginUserDTO) {
    const user = await UserModel.findOne({ email: loginUserDTO.email })
    if (!user) throw CustomErrors.badRequest("No user found with that email")
    const passwordMatch = bcryptAdapter.compare(
      loginUserDTO.password,
      user.password
    )

    if (!passwordMatch)
      throw CustomErrors.badRequest("Email/Password does not match")

    const { password, ...rest } = UserEntity.fromObject(user)
    const token = await JwtAdapter.generateToken({
      id: user.id,
    })

    if (!token) throw CustomErrors.internalServer("Error generating token")

    return {
      user: rest,
      token,
    }
  }
}

export default AuthService
