import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { getElement } from "../app/App.ts";

type MessageIcon = "info" | "warning";
type MessageEvents = "message-component-open" | "asd";

export const MessageEventOpen: MessageEvents = "message-component-open";

export interface MessageData {
    title?: string,
    msg: string | string[],
    icon?: MessageIcon,
    ok?: string,
    cancel?: string
}

export default function MessageComponent(args: { data: MessageData, show: Signal<boolean> }) {

    useEffect(() => {
        
        const msg = getElement("message-main-msg");
        
        if(typeof args.data.msg === 'string')
            msg.innerHTML = args.data.msg;
        else
            msg.innerHTML = args.data.msg.join("<br />");

    }, []);

    return (
        <div class="message-backdrop" onClick={() => args.show.value = false}>
            <div class="message-body">
                {
                    args.data.title &&
                    <div class="message-head">
                        <span class="message-head-title">
                            {args.data.title}
                        </span>
                    </div>
                }

                <div class="message-main">
                    {
                        args.data.icon &&
                        <span id="headerIcone" class="message-main-icon material-symbols-rounded">
                            {args.data.icon}
                        </span>
                    }

                    <span class="message-main-msg">
                        {args.data.msg}
                    </span>

                </div>

                {
                    (args.data.ok || args.data.cancel) &&
                    <div class="message-buttons">
                        {
                            args.data.ok &&
                            <button type="submit">{args.data.ok}</button>
                        }
                        {
                            args.data.cancel &&
                            <button type="button" onClick={() => args.show.value = false}>{args.data.cancel}</button>
                        }
                    </div>
                }

            </div>
        </div>

    );
}