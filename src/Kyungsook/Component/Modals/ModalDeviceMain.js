import axios from 'axios';
import React, { useState,useEffect } from 'react';
import DeviceModal from './DeviceModal';
import {withCookies} from 'react-cookie';
import { Redirect } from 'react-router-dom';

import {
    AWS_URL
}from '../../../Util/api'

const ModalDeviceMain = (props)=> {
    //useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOnpen] = useState(false)
    const {userDeviceInfo,deviceNum,userInfo,setUserInfo,value} = props
    //url
    // const url = '172.26.3.62'
    

    const [deviceOn, setDeviceOn] = useState(false)

    //Modal확인
    const openModal = () =>{
        setModalOnpen(true);   
    }

    const closeModal = () =>{
        setModalOnpen(false)
        setUserInfo({user : '', changUser : false})

    }
        
    //선택 and 삭제 버튼
    const choiceOnClick = (e) =>{
        const {name} = e.target

        if(name === 'ChoiceDevice'){ //기기 선택
            onSelect()    
        }else if(name === 'DeleteDevice'){ //삭제
            console.log("삭제 버튼 클릭")
            console.log("user",userInfo.user.id)
            onDelete()
        }
    }

    //저장
    async  function onSelect () {

        await axios.put(`${AWS_URL}/api/myfarm/select`,{
                id : (JSON.stringify(userInfo.user)),
                token : props.cookies.get('token')
            }).then(data => {
                console.log("ModalDevieMain 선택한 기기 통신 성공",data);
                //선택한 기기 정보 바꾸기 위해서 사용됨
                value.setIsCheck(1)
            }).catch(e =>{
                console.log("ModalDeviceMain 선택한 기기 error",e.error);
            }).finally(closeModal())        
    }
    //삭제
    async  function onDelete () {

        await axios.delete(`${AWS_URL}/api/myfarm`,{
            params: {
                id : parseInt(JSON.stringify(userInfo.user))
            }
        }).then(d=>{
            closeModal()
            //페이지 새롭게 로딩
            window.location.replace("/")
        }).catch(e=>{
            console.error(e)
        })
    }


    return(
        <div>
            {/* 등록된 기기 출력 */}
            {
                userDeviceInfo.map((data,index)=>(
                    
                    <div key={index} className = "item1Button" onClick={() => {openModal() ; (()=>{deviceNum(data)})() }}>
                        {data.machine_name} 
                    </div>
                    ))
            }

            {/* header부분에 텍스트를 입력한다. */}
            <DeviceModal open={modalOpen} close={closeModal} 
                         header="재배기 관리" choiceOnClick={choiceOnClick}
                         deviceOn={deviceOn}
                         >


                {/* Modal.js <main> {props.childern}</main> 에 내용이 입력된다.*/}
                <div>
                    <div className="textStyle">"선택" 및 "삭제"를 선택해 주세요.</div>
                    <br/>
                    <br/>
                    <div className="textStyle"><span className="text">*주의사항</span></div>
                    <div className="textStyle">해당 재배기를 삭제하면 그전에 기록한 정보들은</div>
                    <div className="textStyle">"전부" 삭제됩니다</div>
                </div>

            </DeviceModal >
        </div>
    )

}
export default withCookies(ModalDeviceMain)
