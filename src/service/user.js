import xhr from 'axios'

const pr = process.env.NODE_ENV === 'development' ? 'api' : ''
const loginRequest = (options = {}) => xhr.post(`${pr}/MavenDemo03/login.zk`, options)
const registerRequest = (options = {}) => xhr.post(`${pr}/MavenDemo03/register.zk`, options)
const resetPwd = (options = {}) => xhr.post(`${pr}/MavenDemo03/resetPassword.zk`, options)

export {
	loginRequest,
	registerRequest,
	resetPwd
}