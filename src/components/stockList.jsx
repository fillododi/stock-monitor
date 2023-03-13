import {useState, useEffect, useContext} from "react";
import {BsFillCaretDownFill, BsCaretUpFill, BsFillCaretUpFill} from "react-icons/bs";
import finnHub from "../apis/finnHub";
import {WatchListContext} from "../context/watchListContext";

export const StockList = () => {
    const {watchList} = useContext(WatchListContext)
    const [stocks, setStocks] = useState([])


    const changeColor = (change) => {
        return change>0 ? 'success' : 'danger'
    }

    const renderIcon = (change) => {
        return change>0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>
    }

    useEffect(()=>{
        let isMounted = true
        const fetchData = async ()=>{
            try{
                const responses = await Promise.all(watchList.map((stock)=>{
                    return finnHub.get('/quote', {
                        params:{
                            symbol: stock
                        }
                    })
                }))
                const data = responses.map((response)=>{
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                if(isMounted){
                    setStocks(data)
                }

            } catch (err){
                console.log(err)
            }
        }
        fetchData()

        return () => {isMounted=false}
    }, [watchList])

    return <div>
        <table className="table hover mt-5">
            <thead style={{color: "rgb(80, 90, 100)"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Change</th>
                    <th scope="col">Change (%)</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Prev. Close</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock) => {
                    return <tr className="table-row" key={stock.symbol}>
                        <th scope="row">{stock.symbol}</th>
                        <td>{stock.data.c}</td>
                        <td className={`text-${changeColor(stock.data.d)}`}>
                            {stock.data.d}{renderIcon(stock.data.d)}
                        </td>
                        <td className={`text-${changeColor(stock.data.d)}`}>
                            {stock.data.dp}{renderIcon(stock.data.d)}
                        </td>
                        <td>{stock.data.h}</td>
                        <td>{stock.data.l}</td>
                        <td>{stock.data.o}</td>
                        <td>{stock.data.pc}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}