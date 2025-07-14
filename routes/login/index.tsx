import { Handlers, PageProps } from "$fresh/server.ts";
import LoginController from "../../app/controllers/login/login.controller.ts";
import LoginData from "../../app/controllers/login/login.data.ts";
import { StateData } from "../../app/controllers/state.data.ts";
import LoginIsland from "../../islands/login/login.island.tsx";


export default function Login(props: PageProps<LoginData, StateData>) {
  return (
    <LoginIsland data={props.data} />
  );
}

export const handler: Handlers<LoginData, StateData> = {
  GET(req, ctx) {
    const controller = new LoginController(req, ctx);
    return controller.NovoLogin();
  },

  POST(req, ctx) {
    const controller = new LoginController(req, ctx);
    return controller.Entrar();
  }
};
