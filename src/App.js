import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import AllFruits from './pages/AllFruits';
import AddFruit from './pages/AddFruit';
import UpdateFruit from './pages/UpdateFruit';

function App() {
  return (
    
    <Layout>
      <Routes>
        <Route path='/' element = {<AllFruits/>}> </Route>
        <Route path="/add-fruit" element ={<AddFruit />}> </Route>
        <Route path="/edit-fruit/:id" element ={<UpdateFruit />}> </Route>        
      </Routes>
      
    </Layout>
  );
}

export default App;
