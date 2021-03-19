import React from 'react'
import StepForm from './components/StepForm';
import Result from './components/Result';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={StepForm} />
            <Route exact path="/result" component={Result} />
          </Switch>
        </Router>
        <ToastContainer />
      </Provider>
    </>
  )
}

export default App;