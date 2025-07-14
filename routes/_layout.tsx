import { PageProps } from "$fresh/server.ts";
import { StateData } from "../app/Pages/StateData.ts";
import MenuComponent from "../components/MenuComponent.tsx";

export default function Layout({ Component, state }: PageProps<unknown, StateData>) {
  return (
    <>
      <header>
        <MenuComponent titulo={state.titulo} menu={state.menu!} />
      </header>
      <main>
        <Component />
      </main>
    </>
  );
}
