import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import GlobalStyle from "./GlobalStyle/GlobalStyle";

function App() {

  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <SignInPage />
        </Route>
        <Route path='/sign-up' exact>
          <SignUpPage />
        </Route>
        <Route path='/send-transaction-entry' exact>

        </Route>
        <Route path='/send-transaction-exit' exact>

        </Route>

      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
