import InventoriesTable from "./components/inventoriesTable";
import { Routes, Route } from "react-router-dom";
import AddInventories from "./pages/AddInventories";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InventoriesTable />} />
        <Route path="/inventories/add" element={<AddInventories />} />
      </Routes>
    </>
  );
}
export default App;
