import { Handlers } from "$fresh/server.ts";
import HomeController from "../app/Pages/home/home.controller.ts";
import HomeData from "../app/Pages/home/home.data.ts";
import { StateData } from "../app/Pages/StateData.ts";

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