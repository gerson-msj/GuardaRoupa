import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    GET(req, ctx) {
        console.log("GET", req.url);
        return ctx.render();
    },

    POST(req, ctx) {
        console.log("POST", req.url);
        return ctx.render();
    }
}

export default function Cadastro() {

  return (
    <>
      <p>
        Cadastro
      </p>
      <a href="/">Voltar</a>
    </>
  );
}

