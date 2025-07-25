import { useSignal } from "@preact/signals";
import CadastroData, { Fase } from "../../app/controllers/cadastro/cadastro.data.ts";
import PopupIsland, { PopupData } from "../popup/popup.island.tsx";
import { useRef } from "preact/hooks";
import CadastroBtnIsland, { CadastroBtn } from "./cadastro-btn.island.tsx";

export default function CadastroIsland(args: { data: CadastroData }) {

    args.data.fase = useSignal("Neutro");

    const btns: Record<Fase, CadastroBtn> = {
        "Foto": { text: "Foto", checked: useSignal(false), fase: args.data.fase },
        "Peça": { text: "Peça", checked: useSignal(false), fase: args.data.fase },
        "Cor": { text: "Cor", checked: useSignal(false), fase: args.data.fase },
        "Marca": { text: "Marca", checked: useSignal(false), fase: args.data.fase },
        "Tamanho": { text: "Tamanho", checked: useSignal(false), fase: args.data.fase },
        "Local": { text: "Local", checked: useSignal(false), fase: args.data.fase },
        "Detalhes": { text: "Detalhes", checked: useSignal(false), fase: args.data.fase },
        "Neutro": { text: "Neutro", checked: useSignal(false), fase: args.data.fase }
    };

    const popupFoto: PopupData = {
        show: useSignal(false),
        title: "Foto",
        ok: "Ok"
    };

    return (
        <>
            <form method="post" enctype="multipart/form-data" class="form-cadastro">
                <div class="fases">
                    {
                        Object.entries(btns)
                            .filter(([k, _]) => k !== "Neutro")
                            .map(([k, v]) => <CadastroBtnIsland key={k} data={v} />)
                    }
                </div>
                <p>
                    {args.data.fase.value}
                </p>
                <PopupIsland data={popupFoto}>
                    <p>asd jsjfh akljsdh flajsdh flahsdfahslfj h </p>
                </PopupIsland>
            </form>

        </>
    );
}