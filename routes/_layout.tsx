import { PageProps } from "$fresh/server.ts";
import { StateData } from "../app/controllers/state.data.ts";
import MenuComponent from "../components/menu.component.tsx";
import MsgErrIsland from "../islands/msg/msg-err.island.tsx";

export default function Layout({ Component, state }: PageProps<unknown, StateData>) {
  return (
    <>
      <header>
        <MenuComponent titulo={state.titulo} menu={state.menu!} />
      </header>
      <main>
        <Component />
        <MsgErrIsland data={state} />
      </main>
    </>
  );
}
