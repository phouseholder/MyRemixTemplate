import { Database } from "~/postgrest/database";

// See stores/formFields.ts as an example.
// It is recommended to use ChatGPT or another LLM to generate IModelField based on the .entity.ts file
export interface IModelField {
  name: string;
  alias?: string;
  label: string;
  placeholder: string;
  required: boolean;
  type: "string" | "date" | "number" | "boolean" | "list";
  list_type?: keyof Database["Tables"];
  list_title?: boolean;
  list_fields?: IModelField[];
  title?: boolean;
}
