import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Global } from "@emotion/react";
// import Loader from "./component/Spinners";
import reset from "./reset";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import Main from "./pages/main";

dayjs.locale("ko");

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={reset} />
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
