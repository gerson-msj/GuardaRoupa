import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import LoginData from "../../app/controllers/login/login.data.ts";
import MessageComponent, { MessageData } from "../message.island.tsx";

export default function LoginIsland(args: { data: LoginData }) {

  const errorMsgData: MessageData = {
    msg: args.data.ErrMsgs,
    icon: "warning",
    cancel: "Ok"
  };

  const errorMsgShow = useSignal(args.data.ErrMsgs.length > 0);

  const nomeRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);

  const resetClick = () => {
    nomeRef.current?.focus();
  }

  return (
    <form id="form" method="POST">

      <div class="form">
        <label for="nome">Nome de Usuário</label>
        <input type="text" id="nome" name="nome" autocomplete="username" value={args.data.Nome} ref={nomeRef} />
      </div>
      <div class="form">
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" autocomplete="current-password" value={args.data.Senha} ref={senhaRef} />
      </div>
      <div class="form">
        <button type="submit" id="entrar" >Entrar</button>
        <button type="reset" id="limpar" onClick={resetClick}>Limpar</button>
      </div>
      {
        errorMsgShow.value &&
        <MessageComponent data={errorMsgData} show={errorMsgShow} />
      }

    </form>
  );
}