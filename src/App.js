import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignInPage from "./Components/SignIn/SignInPage";
import SignUpPage from "./Components/SignUp/SignUpPage";
import GlobalStyle from "./GlobalStyle/GlobalStyle";
import UserContext from "./Contexts/UserContext";
import TransactionsEntry from "./Components/TransactionsEntry/TransactionsEntry";
import Transactions from "./Components/Transactions/Transactions";
import TransactionsExit from "./Components/TransactionsExit/TransactionsExit";
import AlertError from "./Alerts/Alerts";
import AlertContext from "./Contexts/AlertContext";
function App() {

  const [userData, setUserData] = useState("");
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {

    const localUserData = localStorage.getItem("userData");

    if (localUserData) {

        setUserData(JSON.parse(localUserData));
    }
    else{

        setUserData("");
    }
  }, [])
  return(
    <UserContext.Provider value={{ userData, setUserData }} >
      <AlertContext.Provider value={{type, setType, message, setMessage,  showAlert, setShowAlert}}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={SignInPage} exact />
          <Route path='/sign-up' component={SignUpPage} exact />
          <Route path='/send-transaction-entry' component={TransactionsEntry} exact />
          <Route path='/send-transaction-exit' component={TransactionsExit} exact />
          <Route path='/transactions' component={Transactions} exact />
        </Switch>
        <GlobalStyle />
        <AlertError showAlert={showAlert} setShowAlert={ setShowAlert} type={type} message={message} />
      </BrowserRouter>
      </AlertContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
