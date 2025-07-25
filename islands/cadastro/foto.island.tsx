import { useEffect, useRef } from "preact/hooks";
import CadastroData from "../../app/controllers/cadastro/cadastro.data.ts";

export default function FotoIsland(args: { data: CadastroData }) {

    const select = useRef<HTMLButtonElement>(null);
    const foto = useRef<HTMLInputElement>(null);
    const view = useRef<HTMLImageElement>(null);
    const enviar = useRef<HTMLButtonElement>(null);
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {

        if (args.data.foto) {
            const blob = new Blob([args.data.foto], { type: "image/jpeg" });
            view.current!.src = URL.createObjectURL(blob);
            enviar.current!.disabled = false;
        } else {
            view.current!.src = "/cabide.jpg";
            enviar.current!.disabled = true;
        }

        form.current!.classList.remove("oculto");

        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.accept = "image/*";
        input.capture = "environment";
        const loader = document.createElement("img") as HTMLImageElement;
        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        canvas.width = 150;
        canvas.height = 200;

        const clearAll = () => {
            if (loader.src !== "") {
                URL.revokeObjectURL(loader.src);
                loader.src = "";
            }

            if (view.current?.src !== "") {
                URL.revokeObjectURL(view.current!.src);
                view.current!.src = "/cabide.jpg";
            }

            enviar.current!.disabled = true;
        };

        select.current?.addEventListener("click", () => {
            input.click();
        });

        input.addEventListener("cancel", () => {
            clearAll();
        });

        input.addEventListener("change", () => {
            if (input.files?.length !== 1) {
                clearAll();
                return;
            }

            const file: File = input.files[0];
            loader.src = URL.createObjectURL(file);
        });

        loader.addEventListener("load", () => {

            const ctx = canvas.getContext("2d");
            if (loader.src === "" || !ctx) {
                clearAll();
                return;
            }

            // Variáveis de destino (posição xy e tamanho wh)
            /**
             * O canvas se encarrega de esticar ou encolher a imagem,
             * O que depende de cálculo são os possíveis cortes na origem para se encaixar no destino.
             */
            const dx = 0;
            const dy = 0;
            const dw = canvas.width;
            const dh = canvas.height;

            // Variáveis de proporção (aspecto).
            /**
             * É calculada a proporção da largura sobre a altura,
             * Assim será possível determinar de a origem é mais larga ou mais alta que o destino.
             */
            const sa = loader.naturalWidth / loader.naturalHeight;
            const da = dw / dh;

            // Variável de sentido do corte.
            /**
             * Como a proporção foi baseada na largura,
             * quando a origem tem uma proporção maior que a do destino,
             * ela é mais larga e o corte será dos lados, do contrário, será acima e abaixo.
             */
            const cx = sa > da;

            // Variáveis de origem (posição xy e tamanho wh)
            /**
             * Aqui se calcula posição e tamanho que serão utilizados dentro da origem, aplicando os cortes.
             * Quando o corte é lateral, a altura se mantém, mas a largura é ajustada com base na proporção do destino.
             *      Neste caso posição inicial da imagem no eixo x é deslocada para descartar o excesso de largura.
             * Quando o corte é acima e abaixo, a largura se mantém, mas altura é ajustada com base na proporção do destino.
             *      Neste caso a posição inicial da imagem no eixo y e deslocada para descartar o excesso de altura.
             * OBS.: Para melhor entendimento é interessante a eralização de um teste de mesa visual.
             *      Usar um papel, ou o excel e o power point pode ajudar.
             */
            const sw = cx ? loader.naturalHeight * da : loader.naturalWidth;
            const sh = cx ? loader.naturalHeight : loader.naturalWidth / da;
            const sx = cx ? (loader.naturalWidth - sw) / 2 : 0;
            const sy = cx ? 0 : (loader.naturalHeight - sh) / 2;

            /**
             * No final, a origem é desenhada no destino,
             * informando as áreas que serão utilizadas da imagem de origem (já considerando os cortes)
             * e a área a ser utilizada no destino (onde o canvas encolhe ou estica a imagem).
             */
            ctx.clearRect(0, 0, dw, dh);
            ctx.drawImage(loader, sx, sy, sw, sh, dx, dy, dw, dh);

            /**
             * A imagem do canvas, já devidamente cortada, convertida, redimensionada e comprimida
             * tem seu blob (dados binários) convertidos em arquivo (em memória) e
             * será obtido uma url para esse arquivo para que seja apresentado em tela
             * e este arquivo será adicionado ao form, para que seja enviado ao servidor.
             */
            canvas.toBlob((blob) => {
                if (blob) {
                    const dataTransfer = new DataTransfer();
                    const file = new File([blob], "imagem.jpeg", { type: "image/jpeg" });
                    dataTransfer.items.add(file);
                    foto.current!.files = dataTransfer.files;
                    view.current!.src = URL.createObjectURL(file);
                    enviar.current!.disabled = false;
                }
            }, "image/jpeg", 0.9);

        });

    }, []);


    return (
        <>
            <div>
                <button type="button" class="img-button" ref={select}>
                    <span class="message-main-icon material-symbols-rounded">
                        add_a_photo
                    </span>
                    Selecione ou tire uma foto
                </button>
            </div>
            <div>
                <img width="150" height="200" ref={view} src="/cabide.jpg" />
            </div>
            <div>
                <input type="file" name="foto" ref={foto} style="display: none" />
                <button type="submit" ref={enviar} disabled>Continuar para cadastro de detalhes</button>
            </div>
            <div>
                <p>
                    Selecione ou tire uma foto da peça que deseja cadastrar.<br />
                    <i>Dica:</i> use a orientação retrato e configure para a proporção 3:4<br />
                    e para a foto ficar legal, tire quantas quiser.
                </p>
            </div>
        </>
    );

}