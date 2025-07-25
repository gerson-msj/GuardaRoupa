import HomeData from "../app/controllers/home/home.data.ts";
import { useSignal } from "@preact/signals";
import MsgIsland, { MsgData } from "./msg/msg.island.tsx";

export default function HomeIsland(args: { data: HomeData }) {

    const msgData: MsgData = {
        show: useSignal(args.data.Sair),
        msg: "Deseja realmente sair?",
        icon: "help",
        ok: "Sim",
        cancel: "Não",
        okCallback: () => { location.assign("/home?quit"); }, 
        cancelCallback: () => { location.assign("/home"); }
    };

    return (
        <>
            <MsgIsland data={msgData} />
        </>
    );
}