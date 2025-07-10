import { useEffect } from "preact/hooks";

export default function AlertaComponent(args: { error?: Error }) {
    useEffect(() => {
        const warn = document.querySelector("#warn");
        if (warn) {
            setTimeout(() => {
                warn.remove();
            }, 5000)
        }
    }, []);

    return (
        <>
            {
                args.error &&
                <div id="warn">
                    <div>
                        <p>{args.error.message}</p>
                    </div>
                </div>
            }
        </>

    );
}