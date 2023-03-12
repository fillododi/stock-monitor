import {useState, useEffect} from "react";
import finnHub from "../apis/finnHub";

export const StockList = () => {
    const [stocks, setStocks] = useState([])
    const [watchList, setWatchList] = useState([])

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
    }, [])

    return <div><p>List of Stocks</p></div>
}