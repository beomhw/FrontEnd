import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import Modal from '../Components/Modal';
import ModalContent from '../Components/ModalContent';
import {flexAlign} from '../../Util/css';

// 백화고차트 데이터
const BaekhwagoData = {
    labels: ['1단계','2단계','3단계','4단계','5단계'],
    datasets: [
        {
            label: 'Temperature-Sunrise',
            data: [20, 20, 17, 15, 15],
            fill: false,
            borderColor: 'rgba(255, 0, 0, 1)'
        },
        {
            label: 'Temperature-Sunset',
            data: [20, 15, 13, 10, 5],
            fill: false,
            borderColor: 'rgba(175, 0, 0, 1)'
        },
        {
            label: 'Humidity',
            data: [90, 70, 60, 50, 40],
            fill: false,
            borderColor: 'blue'
        }
    ]
};

// 백화고차트 옵션
const BaekhwagoOptions = {
    response: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        position: 'nearest'
    },
    scales: {
        yAxes: [{
            ticks:{
                beginAtZero: true,
                max: 100,
                stepSize: 10,
            }
        }]
    }
};

// 백화고 chart
export const BaekhwagoChart = () => {
    const ChartRef = useRef();

    return <Line ref={ChartRef} data={BaekhwagoData} options={BaekhwagoOptions} />;
};

// 전체를 감쌀 div
const FullBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const BaekhwagoGraphBox = styled.div`
    flex: 5;
    padding: 30px;
    border-bottom: 1px solid gray;
`;

const FooterBox = styled.div`
    padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const Description = styled.div`
    flex: 9;
    ${flexAlign};
`;

const DescriptionTitle = styled.div`
    flex: 1;
    height: 100%;
`;

const DescriptionContent = styled.div`
    flex: 3;
    border: 1px solid gray;
    height: 100%;
    ${flexAlign};
`;

const GrowStartButtonBox = styled.div`
    flex: 1;
    padding: 30px;
    display: flex;
`;

const GrowStartButton = styled.button`
    flex: 1;
    border: 3px solid rgba(0,0,0,0.4);
    border-radius: 10px;
    background: none;
    outline: none;
    cursor: pointer;
    &:hover{
        background: beige;
    }
    transition: 0.3s;
`;

const Baekhwago = () => {
    const [opacity, setOpacity] = useState(0);
    const BaekhwaText = {
        title: '주의',
        caution1: '설정하시면 도중에 환경 변경이 불가능합니다.',
        caution2: '재배를 시작하시겠습니까?',
        waterText: '물 주기 횟수 : ',
        sunText: '채광 횟수 : '
    }

    const onModal = () => {
        setOpacity(1);
    }

    const onClose = () => {
        setOpacity(0);
    }
    
    return (
        <FullBox>
            <Modal opacity={opacity} customId="0" onClose={onClose}>
                <ModalContent chartName='baekhwa' text={BaekhwaText} onClose={onClose}/>
            </Modal>
            <BaekhwagoGraphBox>
                <BaekhwagoChart/>
            </BaekhwagoGraphBox>
            <FooterBox>
                <Description>
                    <DescriptionTitle></DescriptionTitle>
                    <DescriptionContent>백화고는 자란 버섯들의 갓 길이의 평균을 기준으로 단계별로 환경을 제공합니다.</DescriptionContent>
                </Description>
                <GrowStartButtonBox>
                    <GrowStartButton onClick={onModal}>적용</GrowStartButton>
                </GrowStartButtonBox>
            </FooterBox>
        </FullBox>
    );
};

export default Baekhwago;