import { PageProps, Handlers } from "$fresh/server.ts";
import CadastroController from "../../app/controllers/login/cadastro.controller.ts";
import CadastroData from "../../app/controllers/login/cadastro.data.ts";
import { StateData } from "../../app/controllers/state.data.ts";
import CadastroIsland from "../../islands/login/cadastro.island.tsx";

export default function Novo(props: PageProps<CadastroData, StateData>) {
  return <CadastroIsland data={props.data} />;
}

export const handler: Handlers<CadastroData, StateData> = {

  GET(req, ctx) {
    const service = new CadastroController(req, ctx);
    return service.get();
  },

  POST(req, ctx) {
    const service = new CadastroController(req, ctx);
    return service.post();
  }

};

