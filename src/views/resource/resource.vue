
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
                            <img :src="item.img" alt="">
                        </div>
                        <p class="course-tit ellipsis">{{item.title}}</p>
                        <p class="author-date">
                            <span>价格：￥{{item.price}}</span>
                        </p>
                        <p class="author-date">
                            <span>学习人数：{{item.learningNumber}}</span>
                        </p>
                        <el-button style="width: 90%;  margin: 12px" type="primary" :disabled="item.isBuy" @click="btnClickBuy(item, index)">
                            {{!item.isBuy ? '购买' : '已购买'}}
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

    export default {
        name: 'discussHomePage',
        data() {
            return {
                courseList: [],
                dialogVisible: false,
                dialogInfo: {
                    title: '',
                },
                payPassword: '',
                payItem: {},
                payIndex: -1
            }
        },
        mounted() {
            let historyCourseList = JSON.parse(localStorage.getItem('COURSE_LIST'))
            if (historyCourseList && historyCourseList.length && historyCourseList.length > 0) {
                this.courseList = historyCourseList
            } else {
                this.getCourseList()
            }
        },
        beforeDestroy() {
            localStorage.setItem('COURSE_LIST',JSON.stringify(this.courseList))
        },
        methods: {
            // 获取课程列表
            getCourseList() {
                const params = {}
                requestCourse(params).then((res) => {
                    if (res.data.code === 100) {
                        this.courseList = res.data.data
                        for (let item of this.courseList) {
                            item.isBuy = false
                        }
                    }
                })
            },
            publish(path) {
                if (localStorage.getItem('loginInfo')) {
                    this.$router.push({path: path})
                } else {
                    this.$message('请先登录再进行操作')
                }
            },
            btnClickPay (item) {
                console.log('支付', this.payIndex)
                if (this.payPassword === '123456') {
                    this.dialogVisible = false
                    this.courseList[this.payIndex].isBuy = true
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
                this.dialogVisible = true
                this.payItem = item
                this.payIndex = index
            },
            btnClickCourse (item, index) {
                // 购买则正常跳转
                if (item.isBuy) {
                    this.$router.push(
                        {
                            path: '/resource/courseDetail',
                            query: {
                                id: item.id
                            }
                        }
                    );
                }
                // 未购买则弹出购买弹窗
                else {
                    this.$message({
                        message: '请先购买该课程',
                        type: 'warning'
                    });
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
