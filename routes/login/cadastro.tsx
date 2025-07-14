
import { Handlers, PageProps } from "$fresh/server.ts";
import CadastroController from "../../app/Pages/Login/CadastroController.ts";
import CadastroData from "../../app/Pages/Login/CadastroData.ts";
import { StateData } from "../../app/Pages/StateData.ts";
import LoginIsland from "../../islands/login/LoginIslan.tsx";

export default function Page(props: PageProps<CadastroData, StateData>) {
  return (
    <LoginIsland data={props.data} />
  );
}

export const handler: Handlers<CadastroData, StateData> = {

  GET(req, ctx) {
    const service = new CadastroController(req, ctx);
    return service.NovoCadastro();
  },

  POST(req, ctx) {
    const service = new CadastroController(req, ctx);
    return service.NovoUsuario();
  }

};

