import { Handlers, PageProps } from "$fresh/server.ts";
import CadastroController from "../app/controllers/cadastro/cadastro.controller.ts";
import CadastroData from "../app/controllers/cadastro/cadastro.data.ts";

import { StateData } from "../app/controllers/state.data.ts";
import CadastroIsland from "../islands/cadastro/cadastro.island.tsx";


export default function Cadastro(props: PageProps<CadastroData>) {
    return <CadastroIsland data={props.data} />
}

export const handler: Handlers<CadastroData, StateData> = {
    GET(req, ctx) {
        const controller = new CadastroController(req, ctx);
        return controller.get();
    }
}