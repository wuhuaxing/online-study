import xhr from 'axios'
const pr = process.env.NODE_ENV === 'development' ? 'api' : ''

// 添加评价
const addEvalua = (options = {}) => xhr.post(`${pr}/MavenDemo03/publishEvaluate.zk`, options)

export {
	addEvalua
}