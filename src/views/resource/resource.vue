
<template>
    <div class="discuss-home-page container">
                <div class="publish-btn-group bgw">
                    <el-button type="primary" plain @click="publish('/course/publishOnlineCourse')">发布资源</el-button>
                </div>
        <!-- 课程 -->
        <section class="discuss-course">
            <h4 class="common-head bgw">资源购买</h4>
            <ul class="course-list clearfix">
                <div @click="btnClickCourse(item, index)" class="course-list-item fl" tag="li"
                     v-for="(item, index) in courseList" :key="index">
                    <div class="course-msg bgw">
                        <div class="course-img">
                            <img :src="handleImg(index)" alt="">
                        </div>
                        <p class="course-tit ellipsis">{{item.title}}</p>
                        <p class="author-date">
                            <span>价格：￥{{item.price}}</span>
                        </p>
                        <p class="author-date">
                            <span>学习人数：{{item.learningNumber}}</span>
                        </p>
                        <el-button style="width: 90%;  margin: 12px" type="primary" :disabled="item.buyId.length > 0 && item.buyId.includes(userId)" @click.stop="btnClickBuy(item, index)">
                            {{item.buyId.length > 0 && item.buyId.includes(userId) ? '已购买' : '购买'}}
                        </el-button>
                    </div>
                </div>
            </ul>
        </section>
        <el-dialog
                :title="'¥' + payItem.price"
                :visible.sync="dialogVisible"
                width="30%">
            <el-input
                    placeholder="请输入密码"
                    type="password"
                    v-model="payPassword">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="success" @click="btnClickPay()">支 付</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { requestCourse } from '@/service/course.js'
    import img1 from '@/assets/danpianji.png'
    import img2 from '@/assets/java.png'
    import img3 from '@/assets/logo.png'
    import img4 from '@/assets/qianrushi.png'

    export default {
        name: 'resources',
        data() {
            return {
                courseList: [],
                dialogVisible: false,
                dialogInfo: {
                    title: '',
                },
                payPassword: '',
                payItem: {},
                payIndex: -1,
                userId: localStorage.getItem('loginInfo') ? JSON.parse(localStorage.getItem('loginInfo')).id : ''
            }
        },
        mounted() {
            let historyCourseList = JSON.parse(localStorage.getItem('COURSE_LIST'))
            if (historyCourseList && historyCourseList.length) {
                this.courseList = historyCourseList
            } else {
                this.getCourseList()
            }
        },
        beforeDestroy() {
            localStorage.setItem('COURSE_LIST',JSON.stringify(this.courseList))
        },
        methods: {
            handleImg(index) {
                switch (index) {
                    case 0:
                        return img1
                        break
                    case 1:
                        return img2
                        break
                    case 2:
                        return img3
                        break
                    case 3:
                        return img4
                        break
                    default:
                        return img3
                        break
                }
            },
            // 获取课程列表
            getCourseList() {
                const params = {}
                requestCourse(params).then((res) => {
                    if (res.data.code === 100) {
                        this.courseList = res.data.data
                        for (let item of this.courseList) {
                            item.buyId = []
                        }
                    }
                })
            },
            publish(path) {
                if (localStorage.getItem('loginInfo')) {
                    this.$router.push({ path: path })
                } else {
                    this.$message('请先登录再进行操作')
                }
            },
            btnClickPay (item) {
                console.log('支付', this.payIndex)
                if (this.payPassword === '123456') {
                    const buyId = JSON.parse(localStorage.getItem('loginInfo')).id
                    // this.courseList[this.payIndex].isBuy = true
                    let buyIds = []
                    if (this.courseList[this.payIndex].buyId.length) {
                        buyIds = this.courseList[this.payIndex].buyId.push(buyId)
                    } else {
                        buyIds = [buyId]
                    }
                    this.$set(this.courseList[this.payIndex], 'buyId', buyIds)
                    if (localStorage.getItem('buyList')) {
                        let buyList = JSON.parse(localStorage.getItem('buyList'))
                        buyList.push(this.courseList[this.payIndex])
                        localStorage.setItem('buyList', JSON.stringify(buyList))
                    } else {
                        let buyList = [this.courseList[this.payIndex]]
                        localStorage.setItem('buyList', JSON.stringify(buyList))
                    }
                    this.dialogVisible = false
                    this.$message({
                        message: '购买成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '密码错误(tips:123456)',
                        type: 'warning'
                    });
                }
            },
            btnClickBuy (item, index) {
                if (localStorage.getItem('loginInfo')) {
                    this.dialogVisible = true
                    this.payItem = item
                    this.payIndex = index
                } else {
                    this.$message('请先登录再进行操作')
                }
            },
            btnClickCourse (item, index) {
                // 购买则正常跳转
                if (item.buyId.length && item.buyId.includes(this.userId)) {
                    this.$router.push(
                        {
                            path: '/course/courseDetail',
                            query: {
                                id: item.id
                            }
                        }
                    )
                } else { // 未购买则弹出购买弹窗
                    this.$message({
                        message: '请先购买该课程',
                        type: 'warning'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/common/vars.scss';
    @import '~@/assets/common/course-list.scss';

    .publish-btn-group {
        box-sizing: border-box;
        padding: 20px;
        margin: 20px 0;
    }
    .discuss-home-page {
        margin-top: 20px;
    }
</style>
