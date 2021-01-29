// Custom chart list context
import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';

// 커스텀 차트 데이터셋 context
const CustomChartListContext = createContext();
// 커스텀 차트 id 및 정보
const CustomChartListInfoContext = createContext();

// chartjs dataset
const setChartjsDataset = (date, temp, humi, growth) => {
    let chartdata = {
        labels: date,
        datasets: [
            {
                label: 'Temperature',
                data: temp,
                fill: false,
                borderColor: 'rgba(255,0,0,0.3)'
            },
            {
                label: 'Humidity',
                data: humi,
                fill: false,
                borderColor: 'rgba(0,0,255,0.3)'
            },
            {
                label: 'GrowthRate',
                data: growth,
                fill: false,
                borderColor: 'gray'
            },
        ]
    };

    return chartdata;
}

const ChartContext = ({children}) => {
    const [customChartDataSet, setCustomChartDataSet] = useState([]);
    const [customChartInfo, setCustomChartInfo] = useState([]);

    useEffect(() => {
        // get axios data
        let data = getData()
        .then(value => {
            // api 데이터 가져왔고
            let da = value.data.filter(da => da.id < 11);
            return da;
        })
        .then(async ch => {
            // 커스텀 차트 정보에 데이터 삽입
            setCustomChartInfo(ch);
            await ch.forEach(data => {
                // chartjs 양식에 맞추기 위한 배열들 선언
                let dateArr = [];   // 날짜
                let tempArr = [];   // 온도
                let humiArr = [];   // 습도
                let growthArr = []; // 생장률
                
                // 온도 데이터
                data.temperature.forEach((temp,index) => {
                    dateArr.push(index + 1);
                    tempArr.push(temp.setting_value);
                });
                // 습도 데이터
                data.humidity.forEach(humi => {
                    humiArr.push(humi.setting_value);
                });
                // 생장률 데이터
                data.growthRate.forEach(growth => {
                    growthArr.push(growth.gr_value);
                });
                // chartjs 데이터셋 생성
                setCustomChartDataSet(
                    ch =>
                    ch.concat(setChartjsDataset(dateArr, tempArr, humiArr, growthArr))
                );
            });
        });
    },[]);

    const getData = async () => {
        let data = await axios.get('http://172.26.3.62/api/farm/custom/list');
        console.log(data);

        return data;
    }

    return (
        <CustomChartListInfoContext.Provider value={customChartInfo}>
            <CustomChartListContext.Provider value={customChartDataSet}>
                    {children}
            </CustomChartListContext.Provider>
        </CustomChartListInfoContext.Provider>
    );
};

export default ChartContext;

export function useCustomChartList() {
    const chartjsListContext = useContext(CustomChartListContext);
    if(!chartjsListContext) 
        console.error('차트 데이터셋 없음');
    return chartjsListContext;
};

export function useCustomChartInfo() {
    const customInfoContext = useContext(CustomChartListInfoContext);
    if(!customInfoContext) 
        console.error('차트 정보 없음');
    return customInfoContext;
};