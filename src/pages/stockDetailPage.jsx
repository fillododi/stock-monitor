import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import finnHub from "../apis/finnHub";

const formatData = (data) => {
    return data.t.map((element, index)=>{
        return {
            x: element * 1000,
            y: data.c[index]
        }
    })
}

export const StockDetailPage = () => {
    const {company: symbol} = useParams()
    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const date = new Date()
            const currentTime = date.getTime()
            const currentTimeSeconds = Math.floor(currentTime/1000)
            let oneDayAgo = currentTimeSeconds - 3600 * 24
            if(date.getDay() === 6) {
                oneDayAgo = oneDayAgo - 3600 * 24
            }
            if(date.getDay() === 0){
                oneDayAgo = oneDayAgo - 3600 * 48
            }
            const oneWeekAgo = currentTimeSeconds - 3600 * 24 * 7
            const oneYearAgo = currentTimeSeconds - 3600 * 24 * 365

            try{
                const responses = await Promise.all([
                    finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneDayAgo,
                            to: currentTimeSeconds,
                            resolution: 30
                        }
                    }),
                    finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneWeekAgo,
                            to: currentTimeSeconds,
                            resolution: 60
                        }
                    }),
                    finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneYearAgo,
                            to: currentTimeSeconds,
                            resolution: "W"
                        }
                    })
                ])
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                })
            } catch (err){
                console.log(err)
            }
        }
        fetchData()
    }, [symbol])

    return <div></div>
}

