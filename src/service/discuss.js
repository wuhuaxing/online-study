import xhr from 'axios'
const pr = process.env.NODE_ENV === 'development' ? 'api' : ''

// 获取问答列表
const requestQuestion = (options = {}) => xhr.post(`${pr}/MavenDemo03/getIssue.zk`, options)
// 获取详情
const requestDetail = (options = {}) => xhr.post(`${pr}/MavenDemo03/getContentById.zk`, options)

export {
	requestQuestion,
	requestDetail
}