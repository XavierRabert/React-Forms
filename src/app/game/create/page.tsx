"use client";
import React from "react";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FormProvider,
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/button";

import { createGameForm } from "./types";
import FormInputControlled from "@/app/components/form/FormInputControlled";
import FormImagePickerControlled from "@/app/components/form/FormImagePickerControlled";
import { Game } from "../types";
import { Input, divider, image } from "@nextui-org/react";
import Image from "next/image";

export default function useCreateGame() {
  const initialValues = React.useMemo<Game>(() => {
    return {
      id: "123",
      name: "Catan",
      age: "4-5",
      duration: "120",
      image: "",
      rate: 8.0,
    };
  }, []);
  const [newGame, setNewGame] = React.useState<Game | null>(initialValues);

  const validationSchema = Yup.object({
    name: Yup.string().required("Camp requerit"),
    age: Yup.string().required("Camp requerit"),
    duration: Yup.string().required("Camp requerit"),
    // image: Yup.lazy((value) =>
    //   typeof value === "object"
    //     ? Yup.object().required("Required field").typeError("Required field") // typeError is necessary here, otherwise we get a bad-looking yup error
    //     : Yup.string().required("Required field")
    // ),
    rate: Yup.number()
      .min(0, "el valor mínim és 0")
      .max(10, "El valor màxim és 10")
      .required(),
  });

  const defaultValues = React.useMemo(() => {
    return { name: "", age: "", duration: "", image: null, rate: 0.0 };
  }, []);

  const methods = useForm<createGameForm>({
    mode: "onSubmit",
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<createGameForm> = async (data) => {
    // setNewGame({ ...data, id: "42" });

    // Guarda les dades
    const formData = { ...data, image: data ? data.image!.name! : "" };

    let params: RequestInit = {
      method: "POST",
      body: JSON.stringify(formData),
    };

    const res = await fetch("/api/upload", params);
    console.log("RESPONSE", res);

    // Guarda la imatge
    const formDataFile = new FormData();
    formDataFile.set("file", data.image!);

    const resFile = await fetch("/api/upload/image", {
      method: "POST",
      body: formDataFile,
    });
    const responseFile = await resFile.json();
    console.log("RESPONSE FILE", responseFile);
  };

  const onError: SubmitErrorHandler<createGameForm> = (error) => {
    console.log(error);
  };

  return (
    <section className="h-max grid grid-cols-2 gap-4">
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
            <Button type="submit" color="primary" className="w-72">
              Crear
            </Button>
          </div>
        </form>
      </FormProvider>
      {newGame && (
        <div className="flex flex-col gap-4">
          <Input
            isDisabled
            type="text"
            label="Nom del joc"
            color="primary"
            defaultValue={newGame.name}
          />
          {/* <Image
              width={300}
              height={250}
              src={newGame.image as string}
              alt={newGame.name}
            /> */}
          <Input
            isDisabled
            type="text"
            label="Edat dels jugdors"
            color="primary"
            // variant="bordered"
            defaultValue={newGame.age}
          />
          <Input
            isDisabled
            type="text"
            label="Durada"
            color="primary"
            // variant="bordered"
            defaultValue={newGame.duration}
          />
          <Input
            isDisabled
            type="number"
            label="Puntuació"
            color="primary"
            // variant="bordered"
            defaultValue={newGame.rate.toString()}
          />
        </div>
      )}
    </section>
  );
}
