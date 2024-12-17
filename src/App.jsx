import BlogList from "./Blog/BlogList";
import BlogDetails from "./Blog/BlogDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Contact from "./Component/Contact";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Correct dynamic route for blogDetails */}
        <Route path="/blogDetails/:id" element={<BlogDetails />} />
        <Route path="/blogList" element={<BlogList />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/Contact" element={<Contact />} />
    

      </Routes>
    </Router>
  );
}

export default App;
