import { Button, Input } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { imagePickerFormProps } from "./types";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

const FormImagePickerControlled: React.FC<imagePickerFormProps> = ({
  control,
  name,
  defaultValue,
  imageUrl,
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    imageUrl
  );

  const { setValue } = useFormContext();

  const handleImageChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      console.log(file);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setValue(name, file, { shouldDirty: true, shouldValidate: true });
      }
    },
    [name, setValue]
  );
  return (
    <Controller
      {...{ name, defaultValue, control }}
      control={control}
      name={name}
      render={() => {
        return (
          <div className="flex gap-2 items-end">
            <input
              accept="image/*"
              type="file"
              className="hidden"
              ref={imageRef}
              onChange={(e) => handleImageChange(e)}
              name={name}
            />
            <Image
              width={300}
              height={250}
              alt="NextUI hero Image"
              src={imagePreview ? (imagePreview as string) : "/image.jpeg"}
            />
            <Button
              color="primary"
              onClick={() => {
                imageRef.current?.click();
              }}
            >
              Tria una imatge
            </Button>
          </div>
        );
      }}
    />
  );
};

export default FormImagePickerControlled;
