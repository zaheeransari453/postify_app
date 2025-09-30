import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/routes";
import Notification from "./components/notification/Notification";
import { useSelector } from "react-redux";

function App() {
  const { message } = useSelector((store) => store.notification);
  return (
    <>
      {message && <Notification />}
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
