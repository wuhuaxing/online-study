import xhr from 'axios'
const pr = process.env.NODE_ENV === 'development' ? 'api' : ''

// 获取文章
const requestArticle = (options = {}) => xhr.post(`${pr}/MavenDemo03/getArticle.zk`, options)
// 获取文章
const requestHotArticle = (options = {}) => xhr.post(`${pr}/MavenDemo03/getHotArticle.zk`, options)
// 获取公告
const requestNotice = (options = {}) => xhr.post(`${pr}/MavenDemo03/getNotice.zk`, options)
// 获取资料
const requestData = (options = {}) => xhr.post(`${pr}/MavenDemo03/getData.zk`, options)
// 获取留言
const requestMessageBroad = (options = {}) => xhr.post(`${pr}/MavenDemo03/getMessageBroad.zk`, options)

// 内容发布（type 1文章2公告3资料）
const publishInfo = (options = {}) => xhr.post(`${pr}/MavenDemo03/publishContent.zk`, options)



export {
	requestArticle,
	requestHotArticle,
	requestNotice,
	requestData,
	requestMessageBroad,
	publishInfo
}