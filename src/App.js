import './App.css';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from "./assets/theme";
import CurrencyConverter from "./pages/currency-converter";

function App() {
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <CurrencyConverter/>
            </ThemeProvider>
        </div>
    );
}

export default App;
