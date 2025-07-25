import { Handlers, PageProps } from "$fresh/server.ts";
import HomeController from "../app/controllers/home/home.controller.ts";
import HomeData from "../app/controllers/home/home.data.ts";
import { StateData } from "../app/controllers/state.data.ts";
import HomeIsland from "../islands/home.island.tsx";

export default function Home(props: PageProps<HomeData>) {

    
    return (
        <>
            <h1>home</h1>
            <HomeIsland data={props.data} />
        </>
    );
}

export const handler: Handlers<HomeData, StateData> = {
    GET(req, ctx) {
        const controller = new HomeController(req, ctx);
        return controller.get();
    }
}