import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect } from "react";
import Icons from "../components/icons";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Roboto } from "@next/font/google";
import { Provider } from "react-redux";
import { store } from "../app/store";
import UserState from "../context/UserState";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});
export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <UserState>
        <SSRProvider>
          <main className={roboto.className}>
            <Component {...pageProps} />
            <Icons />
          </main>
        </SSRProvider>
      </UserState>
    </Provider>
  );
}
