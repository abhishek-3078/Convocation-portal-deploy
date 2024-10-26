import './App.css'
import Login from "./component/Login/Login.jsx"
import Main from './component/Main'
import {Routes , Route} from "react-router-dom";
import Signup from './component/SignUp/Signup.jsx';
import Page from './component/Page';
import Private from './component/Routes/Private';
import Batch from './component/Batch/Batch';
import MainForm from './component/MainForm/MainForm';
import Form from './component/MainForm/Form';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} /> 
        <Route path='/signup' element={<Signup/>} />
        {/* <Route path='dashboard/*' element={<Private/>} > */}
        <Route path='dashboard/*' >
          <Route path="main" element={<Batch/>} />
          <Route path="main/2022" element={<MainForm/>} />
          <Route path="main/2023" element={<MainForm/>} />
          <Route path="main/2024" element={<MainForm/>} />
          <Route path="main/2022/:rollNumber/form" element={<Form/>} />
          <Route path="main/2023/:rollNumber/form" element={<Form/>} />
          <Route path="main/2024/:rollNumber/form" element={<Form/>} />
          <Route path="*" element={<Page/>} />
        </Route>
        <Route path="*" element={<Page/>} />
      </Routes>
    </>
  )
}

export default App
