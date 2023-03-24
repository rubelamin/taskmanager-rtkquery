import React from "react";
import AddButton from "../components/ui/buttons/AddButton";
import TaskList from "./TaskList";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const navigate = useNavigate();

  const addNewClick = () => {
    navigate("/AddNew");
  };

  return (
    <>
      <SideBar />
      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
            <AddButton text="Add New" handleClick={addNewClick} />
          </div>

          <TaskList />
        </main>
      </div>
    </>
  );
}
