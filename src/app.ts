import { envs } from "./config"
import MongoDataBase from "./data/mongo/mongoDB"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"
;(async () => {
  main()
})()

async function main() {
  await MongoDataBase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoURI: envs.MONGO_URI,
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  })

  server.start()
}
