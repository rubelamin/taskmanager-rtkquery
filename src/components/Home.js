import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./MainContent";
import NavBar from "./NavBar";
import AddNew from "./AddNew";
import EditTask from "./EditTask";

export default function Home() {
  return (
    <Router>
      <div className="container relative">
        <NavBar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/AddNew" element={<AddNew />} />
          <Route path="/EditTask/:taskId" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}
