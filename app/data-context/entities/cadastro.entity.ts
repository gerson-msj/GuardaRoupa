import { BaseEntity } from "./base.entity.ts";

export type Fases = "foto" | "detalhes" | "concluido";

export default interface CadastroEntity extends BaseEntity {
    Id: number;
    Fase: Fases;
    Peca?: string;
    Cor?: string;
    Tamanho?: string;
    Marca?: string;
    Local?: string;
    DataAquisicao?: number;
    Detalhes?: string;
}