import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { inputFormProps } from "./types";

const FormInputControlled: React.FC<inputFormProps> = ({
  control,
  name,
  type,
  label,
  defaultValue,
}) => {
  return (
    <Controller
      {...{ name, defaultValue, control }}
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => {
        const { error } = fieldState;
        return (
          <Input
            type={type}
            label={label}
            // className="w-72"
            isInvalid={!!error?.message}
            errorMessage={error?.message}
            value={value}
            color="primary"
            onChange={(e) => onChange(e)}
          />
        );
      }}
    />
  );
};

export default FormInputControlled;
