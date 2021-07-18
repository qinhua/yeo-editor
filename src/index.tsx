import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./assets/style/index.scss";
import App from "./views/App";
import store from "./store/app";
import { Provider } from "react-redux";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
