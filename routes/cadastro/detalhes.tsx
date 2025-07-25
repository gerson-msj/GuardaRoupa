import { Handlers, PageProps } from "$fresh/server.ts";
import CadastroData from "../../app/controllers/cadastro/cadastro.data.ts";
import DetalhesController from "../../app/controllers/cadastro/detalhes.controller.ts";
import { StateData } from "../../app/controllers/state.data.ts";
import DetalhesIsland from "../../islands/cadastro/detalhes.island.tsx";

export default function Detalhes(props: PageProps<CadastroData>) {
    return <DetalhesIsland data={props.data} />;
}

export const handler: Handlers<CadastroData, StateData> = {
    GET(req, ctx) {
        const controller = new DetalhesController(req, ctx);
        return controller.get();
    },
    POST(req, ctx) {
        const controller = new DetalhesController(req, ctx);
        return controller.post();
    }
}