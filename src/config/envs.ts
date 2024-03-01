import "dotenv/config"
import { get } from "env-var"

export default {
  PORT: get("PORT").required().asPortNumber(),

  MONGO_URI: get("MONGO_URI").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),

  JWT_SEED: get("JWT_SECRET").required().asString(),
}
