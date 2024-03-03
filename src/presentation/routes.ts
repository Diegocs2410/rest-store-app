import { Router } from "express"
import { AuthRoutes } from "./auth/routes"
import CategoryRoutes from "./category/routes"

/**
 * Represents the routes of the application.
 */
export class AppRoutes {
  /**
   * Returns the router with the defined routes.
   *
   * @returns {Router} The router with the defined routes.
   */
  static get routes(): Router {
    const router = Router()

    router.use("/api/auth", AuthRoutes.routes)
    router.use("/api/categories", CategoryRoutes.routes)

    return router
  }
}
