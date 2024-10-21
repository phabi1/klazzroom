import { Schema } from "mongoose";

export function Plugin(schema: Schema): void {
const json = {
  transform: (doc: any, ret: any) => {
    return ret;
  }
}

  schema.method('toJSON', function () {
    
  })
}
