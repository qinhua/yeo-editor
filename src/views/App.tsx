import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../views/Home";
import User from "../views/User";
import Page404 from "../views/404";
import { connect } from "react-redux";
// import { get } from "../api/request";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const mapStateToProps = (state: any) => ({
  theme: state.appReducer.theme,
});

function App(props: any) {
  // useEffect(() => {
  //   return function cleanup() {
  //     console.log("组件被卸载componentWillUnmount");
  //   };
  // }, []);
  const themeName = props.theme === 1 ? "light" : "dark";
  return (
    <div className={`App ${themeName}`}>
      {/* 一定要使用Router包裹需要跳转的组件 */}
      <Router>
        <Header />
        <div className="yeo-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user" component={User} />
            <Route component={Page404} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default connect(mapStateToProps)(App);
