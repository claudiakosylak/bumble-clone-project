import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import SplashIndex from "./components/SplashIndex";
import MainIndex from "./components/MainIndex";
import ConversationViewIndex from "./components/ConversationViewIndex";
import ScheduleViewIndex from "./components/ScheduleViewIndex";
import EditProfileIndex from "./components/EditProfileIndex";
import MultiRangeSlider from "./components/MultiRangeSlider";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashIndex />
          </Route>
          <Route path="/app/edit-profile">
            <EditProfileIndex isLoaded={isLoaded} />
          </Route>
          <Route path="/app/connections">
            <ConversationViewIndex isLoaded={isLoaded} />
          </Route>
          <Route path="/app/schedule">
            <ScheduleViewIndex isLoaded={isLoaded} />
          </Route>
          <Route path="/app">
            <MainIndex isLoaded={isLoaded} />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
