import { model, Schema, Document } from "mongoose";

export interface ExampleDoc extends Document {
  foo: string;
  bar: string;
}

const ExampleSchema = new Schema({
  foo: String,
  bar: String,
});

export const Example = model<ExampleDoc>("Example", ExampleSchema);
