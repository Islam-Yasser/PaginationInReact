import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import { Container } from 'react-bootstrap';

function App() {

  return <>
    <Container className='d-flex justify-content-center mt-5'>
      <Home/>
    </Container>
  </>
}

export default App;
