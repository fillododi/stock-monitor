import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {StockOverviewPage} from "./pages/stockOverviewPage";
import {StockDetailPage} from "./pages/stockDetailPage";

export default function App(){
    return(
        <main className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StockOverviewPage/>}></Route>
                    <Route path="/detail/:company" element={<StockDetailPage/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}