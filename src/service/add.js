import xhr from 'axios'

const pr = process.env.NODE_ENV === 'development' ? 'api' : ''

// 添加账号
const addUser = (options = {}) => xhr.post(`${pr}/user/add`, options)

// 发布公告
const publishNotice = (options = {}) => xhr.post(`${pr}/supervisor/pushNotice`, options)

// 添加课程
const addSchedule = (options = {}) => xhr.post(`${pr}/user/addSchedule`, options)

// 添加督导计划
const addPlan = (options = {}) => xhr.post(`${pr}/supervisor/addPlan`, options)

// 添加评价
const addEvalua = (options = {}) => xhr.post(`${pr}/supervisor/comment`, options)

export {
	addUser,
	publishNotice,
	addSchedule,
	addPlan,
	addEvalua
}