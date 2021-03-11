import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import Home from "./components/Home";
import store from "./redux/store";
import theme from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
