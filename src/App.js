import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignInPage from "./Components/SignIn/SignInPage";
import SignUpPage from "./Components/SignUp/SignUpPage";
import GlobalStyle from "./GlobalStyle/GlobalStyle";
import UserContext from "./Contexts/UserContext";
import Transactions from "./Components/Transactions/Transactions";
import TransactionsEntry from "./Components/Transactions/TransactionsEntry";
import TransactionsExit from "./Components/Transactions/TransactionsExit";
function App() {

  const [userData, setUserData] = useState("");

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
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <SignInPage />
          </Route>
          <Route path='/sign-up' exact>
            <SignUpPage />
          </Route>
          <Route path='/send-transaction-entry' exact>
            <TransactionsEntry />
          </Route>
          <Route path='/send-transaction-exit' exact>
            <TransactionsExit />  
          </Route>
          <Route path='/transactions' exact>
            <Transactions />
          </Route>

        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
