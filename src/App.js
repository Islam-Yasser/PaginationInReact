import './App.css';
import Home from './components/Home/Home';
import { Container } from 'react-bootstrap';
import {SideBar} from './components/SideBar/SideBar'

function App() {

  return <>
    <Container className='d-flex justify-content-center mt-5'>
      <Home/>
    </Container>
  </>
}

export default App;
