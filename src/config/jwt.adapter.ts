import jwt from "jsonwebtoken"
import envs from "./envs"

const JWT_SECRET = envs.JWT_SECRET

class JwtAdapter {
  static generateToken(
    payload: { [key: string]: any },
    duration: string = "2h"
  ) {
    return new Promise((resolve, _reject) => {
      return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(null)

          resolve(token)
        }
      )
    })
  }

  static validateToken(toke: string) {
    return
  }
}

export default JwtAdapter
