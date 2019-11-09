import React from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

/*
HSL即色相(Hue)、饱和度(Saturation)、亮度(Lightness)
Hue(H) 是色彩的基本属性, 就是平常所说的颜色名称, 如红色、黄色等, 取值 0-360之间。
Saturation(S) 是指色彩的纯度, 越高色彩越纯, 低则逐渐变灰, 取0-100%的数值。
Lightness(L), 取0-100%。
*/
export default function AnimationExample() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/hsl/10/90/50" />
        </Route>
        <Route
          path="*"
          component={({ match, location, history }) => (
            <AnimationApp match={match} location={location} history={history} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

function AnimationApp({ match, location, history }) {
  return (
    <div>
      <NavBar />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={1000}>
          <Switch>
            <Route
              path="/hsl/:h/:s/:l"
              component={({ match }) => <HSL {...match} />}
            />
            <Route
              path="/rgb/:r/:g/:b"
              component={({ match }) => <RGB {...match} />}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function NavBar() {
  return (
    <ul style={styles.nav}>
      <NavLink to="/hsl/10/90/50">Red</NavLink>
      <NavLink to="/hsl/120/100/40">Green</NavLink>
      <NavLink to="/rgb/33/150/243">Blue</NavLink>
      <NavLink to="/rgb/240/98/146">Pink</NavLink>
    </ul>
  );
}

function NavLink({ to, children }) {
  return (
    <li>
      <Link to={to} style={{ color: "inherit" }}>
        {children}
      </Link>
    </li>
  );
}

function HSL({ url, params }) {
  const { h, s, l } = params;
  return (
    <div
      style={{ backgroundColor: `hsl(${h},${s}%,${l}%)`, ...styles.colorCard }}
    >
      hsl({h}, {s}%, {l}%)
    </div>
  );
}

function RGB({ url, params }) {
  const { r, g, b } = params;
  return (
    <div
      style={{ backgroundColor: `rgb(${r},${g},${b})`, ...styles.colorCard }}
    >
      rgb({r}, {g}, {b})
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    listStyleType: "none",
    justifyContent: "space-around",
    margin: 0,
    padding: "10px 0",
    fontSize: "20px"
  },
  colorCard: {
    color: "white",
    fontSize: "40px",
    position: "absolute",
    top: "130px",
    bottom: 0,
    right: 0,
    left: 0,
    textAlign: "center",
    padding: "20px",
    fontWeight: "bold"
  }
};
