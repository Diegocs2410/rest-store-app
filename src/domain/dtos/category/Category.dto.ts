export default class CreateCategoryDTO {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateCategoryDTO?] {
    const { name, available } = obj
    let availableBoolean = available
    if (!name) return ["Missing category name"]
    if (typeof available !== "boolean") {
      availableBoolean = available === "true"
    }

    return [undefined, new CreateCategoryDTO(name, availableBoolean)]
  }
}
