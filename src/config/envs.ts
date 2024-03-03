import "dotenv/config"
import { get } from "env-var"

export default {
  PORT: get("PORT").required().asPortNumber(),

  MONGO_URI: get("MONGO_URI").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),

  JWT_SEED: get("JWT_SECRET").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
  SEND_EMAIL: get("SEND_EMAIL").default("false").asBool(),
}
