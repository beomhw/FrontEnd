export const AWS_URL = 'http://54.210.105.132'

//////////////////////////////////////////////////버섯 재배기 정보 API
//해당 버섯 재배기의 번호와 진행중인 프로젝트 이름 
// id : 프로그램 ID 
// prg_name : 프로그램 이름	
//param
export const PRG_NAME = '/api/myfarm/data'

// 해당 계정의 버섯 재배기 목록을 가져옴
export const MACHINE_LIST = '/api/myfarm/list'

//재배기 가동 상태
//token
//200, 4040
export const MACHINE_STATUS = '/api/myfarm/status'

//사용자가 실행중인 재배기 id 
//get ,param
//userId 
//200,404
export const MACHINE_ID = '/api/myfarm/id'
//////////////////////////////////////////////////버섯의 상태 정보 API
//해당 프로그램의 모든 버섯 정보들을 가져옴
//prgId
export const MUSHROOM_ALL = '/api/mushroom/all'

//해당 프로그램의 모든 버섯 정보들을 가져옴
//prgId
///api/mushroom/{type}
export const MUSHROOM_TYPE = '/api/mushroom/'

/////////////////////////////////////////////////로그인 관련된 API
//회원가입
//post ,json
//userId, email
//200, 403
export const REGISTER = '/api/register'

//로그인
//post ,json
//token, userId
//200, 401
export const LOGIN = '/api/login'

//로그아웃
//post,json
//token
//200, 404
export const LOGOUT = '/api/logout'
