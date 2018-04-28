import xhr from 'axios'

/*
 * pr: api前缀
 */
const pr = process.env.NODE_ENV === 'development' ? 'api' : ''

// 获取账号列表
const requestUserList = (options = {}) => xhr.post(`${pr}/user/list`, options)

// 删除账号
const delUserAccout = (options = {}) => xhr.post(`${pr}/user/del`, options)

// 督导计划列表
const requesSuperPlanList = (options = {}) => xhr.post(`${pr}/supervisor/listPlan`, options)
    // 督导评价列表
const requestSuperEvaluaList = (options = {}) => xhr.post(`${pr}/supervisor/listCommentBySupervisor`, options)
    // 获取公告列表
const requestNoticeList = (options = {}) => xhr.post(`${pr}/supervisor/listNotice`, options)
    //获取课程表
const requestScheduleList = (options = {}) => xhr.post(`${pr}/supervisor/listSchedule`, options)

//获取系部的排行榜列表
const requestDepartmentRanking = (options = {}) => xhr.post(`${pr}/ranking/queryDepartmentRanking`, options)
    //获取教员评论列表
const requestCommentByTeacher = (options = {}) => xhr.post(`${pr}/supervisor/listCommentByTeacher`, options)
    //获取教员评分排名列表
const requestTeacherRanking = (options = {}) => xhr.post(`${pr}/ranking/queryTeacherRanking`, options)

//删除公告
const delNotice = (options = {}) => xhr.post(`${pr}/supervisor/delNotice`, options)

export {
    requestUserList,
    delUserAccout,
    requesSuperPlanList,
    requestSuperEvaluaList,
    requestNoticeList,
    requestScheduleList,
    requestDepartmentRanking,
    requestCommentByTeacher,
    requestTeacherRanking,
    delNotice
}