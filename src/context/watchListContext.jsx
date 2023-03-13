import {createContext, useState} from "react";

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(["MSFT", "AAPL", "GOOGL", "AMZN", "TSLA"])

    const addStock = (stock) => {
        if(watchList.indexOf(stock) === -1){
            setWatchList([...watchList, stock])
        }
    }
    const deleteStock = (stock) => {
        setWatchList(watchList.filter((element) => {return element !== stock}))
    }

    return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
        {props.children}
    </WatchListContext.Provider>
}