import Main from './pages/Main';
import './App.css';
import './styles/main.css';
import { Route, Routes } from 'react-router';
import Track from './pages/Track';
import CreateParcel from './pages/CreateParcel'
import Header from './components/Header'
import Footer from './components/Footer'
import Registration from './pages/Registration'


function App() {
  return (
    <div className='wrap__container'>

      <Header />
      <div className="main__container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/track" element={<Track />} />
          <Route path="/create-parcel" element={<CreateParcel />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;