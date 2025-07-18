import { Handlers } from "$fresh/server.ts";
import HomeController from "../app/controllers/home/home.controller.ts";
import HomeData from "../app/controllers/home/home.data.ts";
import { StateData } from "../app/controllers/state.data.ts";

export default function Home() {
    return (
        <>
            <h1>home</h1>
        </>
    );
}

export const handler: Handlers<HomeData, StateData> = {
    GET(req, ctx) {
        const controller = new HomeController(req, ctx);
        

        return controller.entrar();
    }
}