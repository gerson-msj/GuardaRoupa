import { Handlers } from "$fresh/server.ts";
import { StateData } from "../app/App.ts";

export default function Home() {
  return (
    <>
      <div class="texto-destaque">
        <em>
          Bem-vindo ao SGR - Sistema de Gerenciamento de Roupas.
        </em>
      </div>
    </>
  );
}

export const handler: Handlers<unknown, StateData> = {
  GET(_, ctx) {
    ctx.state.menu = {
      "/login": "Entre",
      "/login/cadastro": "Cadastre-se"
    };
    return ctx.render();
  }
}