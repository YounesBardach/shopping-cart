import "./styles/App.module.css";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";

function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <ProductGrid />
    </>
  );
}

export default App;
