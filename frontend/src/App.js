import Main from './pages/Main';
import './App.css';
import './styles/main.css';
import { Route, Routes } from 'react-router';
import Track from './pages/Track';
import CreateParcel from './pages/CreateParcel'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/track" element={<Track />} />
        <Route path="/create-parcel" element = {<CreateParcel />} />
      </Routes>
    </>
  );
}

export default App;
