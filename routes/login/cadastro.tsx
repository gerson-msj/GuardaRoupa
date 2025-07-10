import { PageProps } from "$fresh/server.ts";
import { StateData } from "../../app/App.ts";
import CadastroData from "../../app/Pages/Login/Cadastro/CadastroData.ts";
import { CadastroHandler } from "../../app/Pages/Login/Cadastro/CadastroHandler.ts";
import AlertaComponent from "../../islands/AlertaComponent.tsx";
import CadastroComponent from "../../islands/login/cadastro/CadastroComponent.tsx";

export { CadastroHandler as handler }

export default function Page(props: PageProps<CadastroData, StateData>) {

  return (
    <>
      <CadastroComponent data={props.data} />
      <AlertaComponent error={props.data.Error} />
    </>
  );
}