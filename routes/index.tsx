import { Handlers } from "$fresh/server.ts";
import { StateData } from "../app/controllers/state.data.ts";

export default function Index() {

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
  GET(_req, ctx) {
    ctx.state.menu = {
      "/login": "Entre",
      "/login/cadastro": "Cadastre-se"
    };
    
    return ctx.render();
  }
}