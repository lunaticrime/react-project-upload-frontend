import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import TestNavbar from "./components/test-navbar";
import Footer from "./components/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <TestNavbar />
      <div className="h-screen"></div>
      <Footer />
    </>
  );
}

export default App;
