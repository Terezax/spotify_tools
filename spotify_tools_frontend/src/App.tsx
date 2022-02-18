import React from 'react';
import CompareForm from "./components/CompareForm";
import Login from "./components/Login";

function App() {
  return (
    <div className="App container">
        <div className="py-5 text-center">
            <h1>Spotify playlist comparator</h1>
            <p className="lead">Compare your playlists and add missing tracks.</p>
        </div>
        <div className="pb-5 text-center">
            <Login />
        </div>
        <div>
            <CompareForm />
        </div>
        <footer className="my-5 pt-5 text-muted text-center text-small">
            © 2022 šálalílá
        </footer>
    </div>
  );
}

export default App;
