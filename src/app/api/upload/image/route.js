import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", "images", file.name);
    writeFile(filePath, buffer);
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
  }

  return new Response(JSON.stringify({ message: "Uploaded file" }));
}
