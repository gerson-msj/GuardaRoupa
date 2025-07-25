import { useEffect, useRef } from "preact/hooks";
import PopupIsland, { PopupData } from "../popup/popup.island.tsx";

export type MsgIcon = "info" | "warning" | "help";

export interface MsgData extends PopupData {
    msg: string | string[],
    icon: MsgIcon
}

export default function MsgIsland(args: { data: MsgData }) {

    const msg = useRef<HTMLSpanElement>(null);

    useEffect(() => {

        if (msg.current) {
            if (typeof args.data.msg === 'string')
                msg.current.innerHTML = args.data.msg;
            else
                msg.current.innerHTML = args.data.msg.join("<br />");
        }

    }, []);

    return (
        <PopupIsland data={args.data}>
            <div class="msg-body">
                {
                    args.data.icon &&
                    <span id="headerIcone" class="message-main-icon material-symbols-rounded">
                        {args.data.icon}
                    </span>
                }
                <span class="message-main-msg" ref={msg}></span>
            </div>
        </PopupIsland>
    );
}