import Main from './pages/Main';
import './App.css';
import './styles/main.css';
import { Route, Routes } from 'react-router';
import Track from './pages/Track';

function App() {
  return (
    <>
      {/* Use Routes to define paths */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/track" element={<Track />} />
        {/* Uncomment the following line when the `Create` component is ready */}
        {/* <Route path="/create-parcel" element={<Create />} /> */}
      </Routes>
    </>
  );
}

export default App;
