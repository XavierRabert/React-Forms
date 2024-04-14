"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";

export default function useCreateGame() {
  const [value, setValue] = useState("");
  return (
    <section className="h-max">
      <form action="">
        <div className="flex flex-col gap-4d">
          <Input type="text" label="Nom del joc" className="w-72" />
          <Input type="text" label="Edat" className="w-72" />

          <Button color="primary">Click me</Button>
        </div>
      </form>
    </section>
  );
}
