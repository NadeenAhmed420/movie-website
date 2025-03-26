import { Route, Routes } from "react-router-dom";
import Movie from "./component/movies/Movie";
import Home from "./component/Home";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies/:title" element={<Movie />} />
      </Route>
    </Routes>
  );
}

export default App;
