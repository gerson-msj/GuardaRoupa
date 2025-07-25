import { Signal } from "@preact/signals";

export type Fase = "Foto" | "Peça" | "Cor" | "Tamanho" | "Marca" | "Local" | "Detalhes" | "Neutro";

export default class CadastroData {
    public fase?: Signal<Fase>;
    public foto?: Uint8Array<ArrayBuffer>;

}