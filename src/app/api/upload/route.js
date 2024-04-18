import { games } from "../../data/games.json";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const body = await new Response(req.body).json(); // Lee el cuerpo de la solicitud
      if (!games.find((game) => game.id === body.id)) games.push(body);
    } catch (error) {
      console.error("Error al procesar la solicitud POST:", error);
    }
  }

  return new Response(JSON.stringify({ message: "Uploading files" }));
}
