import { Control } from "react-hook-form";

export type inputFormProps = {
  label?: string;
  control: Control<any>;
  defaultValue?: string | number | undefined;
  name: string;
  type: "text" | "number" | "email";
};

export type imagePickerFormProps = {
  control: Control<any>;
  defaultValue?: string | number | undefined;
  imageUrl: string | null;
  name: string;
};
