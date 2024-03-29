import jwt from "jsonwebtoken"
import envs from "./envs"

const JWT_SEED = envs.JWT_SEED

class JwtAdapter {
  // DI?

  static async generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null)

        resolve(token)
      })
    })
  }

  static validateToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null)
        resolve(decoded)
      })
    })
  }
}

export default JwtAdapter
