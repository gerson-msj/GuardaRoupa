import { Handlers, PageProps } from "$fresh/server.ts";
import LoginController from "../../app/Pages/Login/LoginController.ts";
import LoginData from "../../app/Pages/Login/LoginData.ts";
import { StateData } from "../../app/Pages/StateData.ts";
import LoginIsland from "../../islands/login/LoginIslan.tsx";

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
