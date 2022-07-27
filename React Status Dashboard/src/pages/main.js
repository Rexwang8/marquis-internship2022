import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.js";
import AdminPage from "./admin.js";
import News from "./news.js";
import NotFoundPage from "../components/DOMrouting/NotFoundPage.js";

import GuardedRoute from "../components/DOMrouting/GuardedRoute.js";
import Production from "./production.js";
import EvapPage from "./evapPage.js";
import ProductionAdmin from "./productionAdmin.js";

const Main = (props) => {
  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='*' element={<NotFoundPage />}></Route>
      <Route
        exact
        path='/'
        element={
          <GuardedRoute guard={"locuser"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <Dashboard messageData={props.messageData} stateData={props.stateData} setstateData={props.setstateData} setmessageData={props.setmessageData} isadmin={props.isadmin}></Dashboard>
          </GuardedRoute>
        }></Route>
      <Route
        exact
        path='/admin'
        element={
          <GuardedRoute guard={"admin"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <AdminPage messageData={props.messageData} stateData={props.stateData} setstateData={props.setstateData} setmessageData={props.setmessageData} isadmin={props.isadmin}></AdminPage>
          </GuardedRoute>
        }></Route>
      <Route
        exact
        path='/news/illinois'
        element={
          <GuardedRoute guard={"locuser"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <News
              messageData={props.messageData}
              stateData={props.stateData}
              setstateData={props.setstateData}
              setmessageData={props.setmessageData}
              isadmin={props.isadmin}
              facility='illinois'></News>
          </GuardedRoute>
        }></Route>

      <Route
        exact
        path='/news/wisconsin'
        element={
          <GuardedRoute guard={"locuser"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <News
              messageData={props.messageData}
              stateData={props.stateData}
              setstateData={props.setstateData}
              setmessageData={props.setmessageData}
              isadmin={props.isadmin}
              facility='wisconsin'></News>
          </GuardedRoute>
        }></Route>

<Route
        exact
        path='/production/admin'
        element={
          <GuardedRoute guard={"admin"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <ProductionAdmin
              facility='illinois'
              isadmin={props.isadmin}></ProductionAdmin>
          </GuardedRoute>
        }></Route>

<Route
        exact
        path='/production/illinois'
        element={
          <GuardedRoute guard={"locuser"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <Production
              facility='illinois'></Production>
          </GuardedRoute>
        }></Route>

<Route
        exact
        path='/suezevap/north'
        element={
          <GuardedRoute guard={"locuser"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <EvapPage
              facility='north'></EvapPage>
          </GuardedRoute>
        }></Route>

<Route
        exact
        path='/suezevap/south'
        element={
          <GuardedRoute guard={"locuser"} isuser={props.isuser} isadmin={props.isadmin} isonsite={props.isonsite}>
            <EvapPage
              facility='south'></EvapPage>
          </GuardedRoute>
        }></Route>
    </Routes>
  );
};

export default Main;
