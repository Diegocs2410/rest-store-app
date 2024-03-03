import { Request, Response } from "express"
import CustomError from "../../domain/errors/custom.error"
import { CreateCategoryDTO } from "../../domain"

export default class CategoryController {
  constructor() {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message })

    console.log(`${error}`)
    return res.status(500).json({ error: "Internal server error" })
  }

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDTO] = CreateCategoryDTO.create(req.body)
    if (error) return res.status(400).json({ error })
    res.json(createCategoryDTO)
  }

  getCategories = async (req: Request, res: Response) => {
    res.json("Categories list")
  }
}
