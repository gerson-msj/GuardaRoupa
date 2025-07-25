import { Signal } from "@preact/signals";
import { Fase } from "../../app/controllers/cadastro/cadastro.data.ts";

export interface CadastroBtn {
    text: Fase,
    checked: Signal<boolean>,
    fase: Signal<Fase>
}

export default function CadastroBtnIsland(args: { data: CadastroBtn }) {
    return (
        <button type="button" onClick={() => { args.data.fase.value = args.data.text; }}>
            {
                args.data.checked.value &&
                <span class="message-main-icon material-symbols-rounded">
                    check_small
                </span>
            }
            {args.data.text}
        </button>
    );
}