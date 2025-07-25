import { useEffect, useRef } from "preact/hooks";
import CadastroData from "../../app/controllers/cadastro/cadastro.data.ts";

export default function DetalhesIsland(args: { data: CadastroData }) {

    const view = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (view.current && args.data.foto) {
            const blob = new Blob([args.data.foto], { type: "image/jpeg" });
            view.current!.src = URL.createObjectURL(blob);
        }
    }, []);

    return (
        <form class="form-detalhes">
            <div>
                <img width="75" height="100" ref={view} src="/cabide.jpg" />
            </div>
        </form>
    );
}