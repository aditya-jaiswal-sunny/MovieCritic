import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './component/header/Header';
import Movie from './page/movie/Movie';
import Review from './page/review/Review';
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header ></Header>
      <Routes>
        <Route
          path="/"
          element={<Movie />}
        />
        <Route
          path="/movie/:id/:review"
          element={<Review />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
