import React, { useEffect, useState } from 'react' ;

import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import HelpCss from '../Component/HelpComponent/HelpCss';
import HelpList from '../Component/HelpComponent/HelpList';

const Help = (props) => {

    //isLogin cookie 값 확인
    const isLoginCheck = props.cookies.get('isLogin')
    //axios 값 담기
    const [list, setList] = useState([])
    const [kinokoInfo, setKinokoInfo] = useState([])
    //해당 버튼 클릭시 정보 보여주기
    const onClick = (data) =>{
        console.log("help data",data);
        setKinokoInfo(data)
    }

    useEffect(()=>{
        console.log('help main',list);
        
    },[])

    useEffect(()=>{
        console.log('help main',list);
        list.map(data => ( data.id === 1 && setKinokoInfo(data)))
    },[list])

    return (
        <>
        {
            props.cookies.get('token') ? 
            (
                <>
                    <HelpList setList={setList} setKinokoInfo={setKinokoInfo}/>
                    <HelpCss list ={list} kinokoInfo={kinokoInfo} onClick={onClick}/>
                </>
            )
            :
            (<Redirect to="/login" />)
        }
        </>
    );
};

export default withCookies(Help) ;