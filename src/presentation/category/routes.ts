import { Router } from "express"
import CategoryController from "./controller"

class CategoryRoutes {
  static get routes() {
    const router = Router()
    const catController = new CategoryController()
    router.get("/", catController.getCategories)
    router.post("/", catController.createCategory)
    return router
  }
}

export default CategoryRoutes
