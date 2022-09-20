import "./App.scss";
import Chat from "./components/Chat";
import { actionTypes } from "./context/reducer";

import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { useStateValue } from "./context/StateProvider";

import db, { auth } from "./backend/Firebase";
import Default from "./components/Default";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [{ user }, dispatch] = useStateValue();
  const removeRoom = (roomid) => {
    db.collection("rooms").doc(roomid).delete();
  };

  useEffect(() => {
    setLoading(true);
    const listener = auth.onAuthStateChanged((authUser) => {
      setLoading(false);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });
    return () => listener();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="app">
          {!user ? (
            <Login />
          ) : (
            <div className="app__body">
              <Router>
                <Sidebar />
                <Routes>
                  <Route
                    path="rooms"
                    element={<Chat removeRoom={removeRoom} />}
                  >
                    <Route
                      path=":roomId"
                      element={<Chat removeRoom={removeRoom} />}
                    />
                  </Route>
                  <Route path="/" element={<Default />} />
                </Routes>
              </Router>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
