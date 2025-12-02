import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeDetail from "./Components/cardetails";
import Home from "./Components/home";
const App=()=>{
  return (
  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/RecipeDetail/:id" element={<RecipeDetail/>} />
      </Routes>
  );
}
export default App;