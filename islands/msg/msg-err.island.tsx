import { useSignal } from "@preact/signals";
import MsgIsland, { MsgData } from "./msg.island.tsx";
import { StateData } from "../../app/controllers/state.data.ts";

export default function MsgErrIsland(args: { data: StateData }) {

    const msgErrData: MsgData = {
        show: useSignal(args.data.errMsg ? args.data.errMsg.length > 0 : false),
        msg: args.data.errMsg,
        icon: "warning",
        ok: "Ok"
    };

    return <MsgIsland key="msgErr" data={msgErrData} />;
}