import './App.css';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AddPage from './pages/AddPage'
import ListPage from './pages/ListPage'
import HomePage from './pages/HomePage'
import UpdatePage from './pages/UpdatePage'
import { Container, Box } from '@mui/system';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Header />
      <Box sx={{backgroundColor: '#ddd'}}>
        <Container> 
          <Routes>
            <Route exact path="/" element={<HomePage />}> </Route>
            <Route exact path="/add" element={<AddPage />}> </Route>
            <Route exact path="/list" element={<ListPage />}> </Route>
            <Route exact path="/update/:todoId" element={<UpdatePage />}> </Route>
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
