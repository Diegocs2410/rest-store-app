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
import { envs, jwtAdapter } from "../../config"
import EmailService from "./email.service"

class AuthService {
  constructor(private readonly emailService: EmailService) {}

  private sendEmailVerificationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email })
    if (!token)
      throw CustomErrors.internalServer("Error getting generating token")

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
    const html = `
      <h1>Validate Your Email</h1>
      <p>Click on the following to validate your email</p>
      <a href="${link}">Validate: ${email}</a>
    `

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    }
    const isSent = await this.emailService.sendEmail(options)
    if (!isSent) throw CustomErrors.internalServer("Error sending email")

    return true
  }

  public async registerUser(registerUserDTO: RegisterUserDTO) {
    const existUser = await UserModel.findOne({ email: registerUserDTO.email })
    if (existUser) throw CustomErrors.badRequest("Email already exists")

    try {
      const user = new UserModel(registerUserDTO)

      // Encrypt Password
      user.password = bcryptAdapter.hash(registerUserDTO.password)
      await user.save()

      // Confirmation Email
      await this.sendEmailVerificationLink(user.email)
      const { password, ...rest } = UserEntity.fromObject(user)
      // JWT to authenticate
      const token = await JwtAdapter.generateToken({
        id: user.id,
      })

      if (!token) throw CustomErrors.internalServer("Error generating token")
      return {
        user: rest,
        token,
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

  public async validateEmail(token: string) {
    const payload = await jwtAdapter.validateToken(token)
    if (!payload) throw CustomErrors.unAuthorized("Invalid Token")

    const { email } = payload as { email: string }
    if (!email) throw CustomErrors.internalServer("Error not within token")
    const user = await UserModel.findOne({ email })
    if (!user) throw CustomErrors.internalServer("User emal not found")

    user.emailValidated = true
    await user.save()

    return true
  }
}

export default AuthService
