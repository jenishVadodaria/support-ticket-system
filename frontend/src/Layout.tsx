import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgentPage from "./pages/AgentPage/AgentPage";
import TicketPage from "./pages/TicketPage/TicketPage";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <div className="float-none mx-auto my-0 w-[90%] max-w-[1440px] pb-8">
        <Header />
        <main>
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/agents" Component={AgentPage} />
            <Route path="/tickets" Component={TicketPage} />
          </Routes>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Layout;
