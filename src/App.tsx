import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Kanbas from "./Kanbas";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
export default function App() {
 return (
  <HashRouter>
   <div>
   <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to="Kanbas"/>}/>
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kanbas/*" element={<Kanbas />} />
      </Routes>
    </Provider>
   </div>
  </HashRouter>
);}



