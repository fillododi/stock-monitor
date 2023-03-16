import Chart from "react-apexcharts"
import {useEffect, useState} from "react";

export const StockChart = ({chartData, symbol})=>{
    const [dateRange, setDateRange] = useState("24h")
    const {day, week, year} = chartData

    const getTimeRange = () => {
        switch (dateRange){
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day
        }
    }

    const data = getTimeRange()

    const options = {
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "stock_data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "dd MMM HH:mm"
            }
        }
    }



    const series = [{
        name: symbol,
        data: data
    }]

    const renderSelection = (button) => {
        const classes = "btn m-1 "
        if(button === dateRange){
            return classes + "btn-primary"
        } else {
            return classes + "btn-outline-primary"
        }
    }

    return <div className="mt-5 p-4 shadow-sm bg-white">
        <Chart options={options} series={series} type="area" width="100%"/>
        <div>
            <button className={renderSelection("24h")} onClick={()=>setDateRange("24h")}>24h</button>
            <button className={renderSelection("7d")} onClick={()=>setDateRange("7d")}>7d</button>
            <button className={renderSelection("1y")} onClick={()=>setDateRange("1y")}>1y</button>
        </div>
    </div>
}