import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";

import { persistor, store } from "./redux/store.ts";

import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { SocketContextProvider } from "./context/SocketContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </PersistGate>
  </Provider>
);
