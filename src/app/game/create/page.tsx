"use client";
import { useRef } from "react";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FormProvider,
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";

import { createGameForm } from "./types";
import FormInputControlled from "@/app/components/form/FormInputControlled";
import FormImagePickerControlled from "@/app/components/form/FormImagePickerControlled";

export default function useCreateGame() {
  const imageRef = useRef<HTMLInputElement>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Camp requerit"),
    age: Yup.string().required("Camp requerit"),
    duration: Yup.string().required("Camp requerit"),
    image: Yup.string().required("Camp requerit"),
    rate: Yup.number().min(0).max(10).required(),
  });

  const defaultValues: createGameForm = {
    name: "",
    age: "",
    duration: "",
    image: "",
    rate: 0.0,
  };

  const methods = useForm<createGameForm>({
    mode: "onSubmit",
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, register, control } = methods;

  const onSubmit: SubmitHandler<createGameForm> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<createGameForm> = (error) => {
    console.log(error);
  };

  return (
    <section className="h-max">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col gap-4">
            <FormInputControlled
              type="text"
              label="Nom del joc"
              name="name"
              control={control}
            />
            <FormInputControlled
              type="text"
              label="Edat"
              name="age"
              control={control}
            />
            <FormInputControlled
              type="text"
              label="Temps"
              name="duration"
              control={control}
            />
            <FormImagePickerControlled
              control={control}
              name="image"
              imageUrl=""
            />
            <FormInputControlled
              type="number"
              label="Puntuació"
              name="rate"
              control={control}
            />
            <Button type="submit" color="primary">
              Click me
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
