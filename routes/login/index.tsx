import { Handlers } from "$fresh/server.ts";
import { StateData } from "../../app/App.ts";

export default function Page() {
    return (
        <h1>Entre</h1>
    );
}

export const handler: Handlers<unknown, StateData> = {
  GET(_, ctx) {
    ctx.state.menu = {
      "/": "Voltar"
    };
    return ctx.render();
  }
}