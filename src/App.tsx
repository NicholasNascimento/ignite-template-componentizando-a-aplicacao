import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";
import { CineProvider } from "./CineContext";

export function App() {
  return (
    <CineProvider>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Content />
      </div>
    </CineProvider>
  );
}
