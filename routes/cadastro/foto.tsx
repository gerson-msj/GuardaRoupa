import { Handlers, PageProps } from "$fresh/server.ts";
import FotoController from "../../app/controllers/cadastro/foto.controller.ts";
import CadastroData from "../../app/controllers/cadastro/cadastro.data.ts";
import { StateData } from "../../app/controllers/state.data.ts";
import FotoIsland from "../../islands/cadastro/foto.island.tsx";

export default function Foto(props: PageProps<CadastroData>) {
    return <FotoIsland data={props.data} />;
}

export const handler: Handlers<CadastroData, StateData> = {
    GET(req, ctx) {
        const controller = new FotoController(req, ctx);
        return controller.get();
    },
    POST(req, ctx) {
        const controller = new FotoController(req, ctx);
        return controller.post();
    }
}