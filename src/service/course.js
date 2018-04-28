import xhr from 'axios'
const pr = process.env.NODE_ENV === 'development' ? 'api' : ''

// 获取问答列表
const requestCourse = (options = {}) => xhr.post(`${pr}/MavenDemo03/getCourse.zk`, options)
// 内容发布（type 1文章2公告3资料）
const publishCourse = (options = {}) => xhr.post(`${pr}/MavenDemo03/publishCourse.zk`, options)
// 通过Id获取指定课程
const requestCourseDetail = (options = {}) => xhr.post(`${pr}/MavenDemo03/getCourseById.zk`, options)


export {
	requestCourse,
	publishCourse,
	requestCourseDetail
}