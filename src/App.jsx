import FileUploadComponent from "./FileUpload.jsx";
import ResponseTable from "./ResponseTable.jsx";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<FileUploadComponent />} />
        <Route path="/result" element={<ResponseTable />} />
        <Route path="*" element={<FileUploadComponent />} />
      </Routes>
    </div>
  );
}

export default App;
