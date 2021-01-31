export default interface IValidator<Output> {
  validate(body: unknown): Output;
}
