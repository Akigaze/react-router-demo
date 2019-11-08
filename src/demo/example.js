import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

const GALLERY = [
  { id: 0, title: "Dark Orchid", color: "darkorchid" },
  { id: 1, title: "Lime Green", color: "limegreen" },
  { id: 2, title: "Tomato", color: "tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "crimson" }
];

export default function ModalGalleryExample() {
  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}

const ModalSwitch = withRouter(({ location }) => {
  const backgroud = location.state && location.state.backgroud;
  return (
    <div>
      <Switch location={backgroud || location}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          path="/gallery"
          component={({ location, match }) => (
            <Gallery location={location} match={match} />
          )}
        />
        <Route
          path="/img/:id"
          component={({ match }) => <ImageView {...match} />}
        />
      </Switch>
      {backgroud && (
        <Route
          path="/img/:id"
          component={({ history, match }) => (
            <GalleryModel history={history} {...match} />
          )}
        />
      )}
    </div>
  );
});

function Home() {
  return (
    <div>
      <Link to="/gallery">Visit the Gallery</Link>
      <h2>Featured Images</h2>
      <ul>
        <li>
          <Link to="/img/2">Tomato</Link>
        </li>
        <li>
          <Link to="/img/4">Crimson</Link>
        </li>
      </ul>
    </div>
  );
}

function ImageView({ url, params }) {
  const image = find(parseInt(params.id, 10));
  if (!image) return <p>Image not found!</p>;
  return (
    <div>
      <h2>{image.title}</h2>
      <div
        style={{
          margin: "auto",
          height: "500px",
          backgroundColor: image.color
        }}
      />
    </div>
  );
}

function Gallery({ location }) {
  return (
    <div>
      {GALLERY.map((g, i) => (
        <Thumbnail key={i} location={location} {...g} />
      ))}
    </div>
  );
}

function Thumbnail({ location, id, title, color }) {
  return (
    <Link to={{ pathname: `/img/${id}`, state: { backgroud: location } }}>
      <div style={{ width: "50px", height: "50px", backgroundColor: color }} />
      <p>{title}</p>
    </Link>
  );
}

function GalleryModel({ history, params }) {
  const image = find(parseInt(params.id, 10));
  if (!image) return <p>Image not found!</p>;

  const close = (event, id) => {
    if (event.target.id === id) {
      event.stopPropagation();
      history.goBack();
    }
  };
  return (
    <div
      id="modal"
      onClick={event => close(event, "modal")}
      style={{
        backgroundColor: "#AAA5",
        position: "absolute",
        top: 0,
        left: 0,
        rigth: 0,
        bottom: 0,
        width: "100%"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "100px",
          background: "white",
          width: "600px",
          border: "3px solid grey",
          padding: "20px"
        }}
      >
        <h1>{image.title}</h1>
        <div
          style={{
            height: "500px",
            backgroundColor: image.color
          }}
        />
        <button id="close-btn" onClick={event => close(event, "close-btn")}>
          Close
        </button>
      </div>
    </div>
  );
}

function find(id) {
  return GALLERY.find(g => g.id === id);
}
