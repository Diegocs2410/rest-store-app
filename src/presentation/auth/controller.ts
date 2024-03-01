import { Request, Response } from "express"
import { LoginUserDTO, RegisterUserDTO } from "../../domain"
import AuthService from "../services/auth.service"
import CustomError from "../../domain/errors/custom.error"

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: "Internal Server error" })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDTO] = RegisterUserDTO.create(req.body)
    if (error) return res.status(400).json({ error })
    this.authService
      .registerUser(registerUserDTO!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginUserDTO.create(req.body)
    if (error) return res.status(400).json({ error })

    this.authService
      .loginUser(loginUserDTO!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res))
  }
  validateEmail = (req: Request, res: Response) => {
    res.json("validateEmail")
  }
}
