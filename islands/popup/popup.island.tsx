import { Signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { ComponentChildren } from "preact";

export interface PopupData {
    show: Signal<boolean>,
    title?: string,
    ok?: string,
    cancel?: string,
    okCallback?: () => void,
    cancelCallback?: () => void
}

export default function PopupIsland(args: { children: ComponentChildren, data: PopupData }) {
    
    const backdrop = useRef<HTMLDivElement>(null);
    const ok = useRef<HTMLButtonElement>(null);
    const cancel = useRef<HTMLButtonElement>(null);

    const okFn = () => {
        args.data.show.value = false;
        args.data.okCallback?.();
    }

    const cancelFn = () => {
        args.data.show.value = false;
        args.data.cancelCallback?.();
    }
    
    useEffect(() => {
        ok.current?.addEventListener("click", okFn);
        cancel.current?.addEventListener("click", cancelFn);
        backdrop.current?.addEventListener("click", okFn);
    }, []);

    return (
        <>
            {
                args.data.show.value &&
                <>
                    <div class="popup-backdrop" ref={backdrop}></div>
                    <div class="popup-body">
                        {
                            args.data.title &&
                            <h1 class="popup-title">
                                {args.data.title}
                            </h1>
                        }
                        
                        <div class="popup-children">
                            {args.children}
                        </div>

                        {
                            (args.data.ok || args.data.cancel) &&
                            <div class="popup-button">
                                {args.data.ok && <button type="button" ref={ok}>{args.data.ok}</button>}
                                {args.data.cancel && <button type="button" ref={cancel}>{args.data.cancel}</button>}
                            </div>
                        }

                    </div>
                </>
            }
        </>
    );
}