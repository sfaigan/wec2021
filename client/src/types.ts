// TODO: Find a better way to share interfaces without introducing an entire shared package
export interface Example {
  _id: string;
  foo: string;
  bar: string;
}

export type ExampleAdd = Pick<Example, "foo" | "bar">;
export type ExampleUpdate = Partial<Pick<Example, "foo" | "bar">>;
