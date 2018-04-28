<template>
    <div class="notice_board" :style="{width: width}">
        <transition-group v-if="list.length > 0" class="bulletin_ul" tag="ul" name="ls">
            <li v-for="(item, index) in list" class="bulletin_li" :key="item.id" @mouseenter="stop" @mouseleave="roll">
                <el-tooltip effect="light" :content='item.content' placement="bottom">
                    <span class="msg"> {{ item ? item.title : '' }} </span>
                </el-tooltip>
                <span class="time fr">{{item ? item.date : null | dateFormat('MM-dd HH:mm') }}</span>
            </li>
        </transition-group>
        <div v-else class="isNull-list">
            暂无公告
        </div>
    </div>
</template>

<script>
    import { requestNotice } from '@/service/info.js'

    export default {
        name: 'notice_board',
        data() {
            return {
                list: [],
                datas: [],
            }
        },
        props: {
            ifHead: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '260px'
            },
            duration: {
                type: Number,
                default: 3000
            }
        },
        mounted() {
            this.getNoticeList()
        },
        methods: {
            getNoticeList() {
                const params = {}
                requestNotice(params).then((res) => {
                    if (res.data.code === 100) {
                        this.datas = res.data.data
                    }
                })
            },
            roll() {
                let list = this.list
                if (list.length > 10) {
                    this.time = setInterval(function () {
                        let item = list.shift()
                        setTimeout(function() {
                            list.push(item)
                        }, 0)
                    }, this.duration)
                }
            },
            stop() {
                clearInterval(this.time)
            }
        },
        watch: {
             datas: {
                handler: function (val, oldVal) {
                    if (val.length != 0) {
                        this.list.push(...val)
                        this.roll()
                    }
                },
                deep: true
            }
        },
        destroyed() {
            this.stop()
        }
    }
</script>


<style lang='scss'>
.el-tooltip__popper {
    width: 300px;
    word-wrap: break-word;
    word-break: normal;
}
</style>

<style lang='scss' scoped>
.notice_board {
    box-sizing: border-box;
    font-size: 14px;
    max-height: 500px;
    overflow: hidden;
    margin-bottom: 20px;
    .title {
        font-size: 18px;
        padding: 12px 0px;
        border-bottom: 1px solid #c9c9c9;
        text-indent: .5em;
    }
    .bulletin_ul {
        padding: 15px 10px 0;
        // width: 80%;
        overflow: hidden;
        // height: 260px;
        // border-bottom: 1px solid #ccc;
        .bulletin_li {
            padding: 10px 0 0;
            border-bottom: 1px solid #ccc;
            transition: all 1s;
            cursor: pointer;
            text-overflow:ellipsis;
            line-height: 2;
            .msg {
                display: inline-block;
                width: 60%;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .time {
                color: #999;
            }
        }
    }
    .ls-enter-active, .ls-leave-active {
        transition: opacity 1s, transform 1s;
    }
    .ls-enter {
        opacity: 0;
        transform: translateY(30px);
    }
    .ls-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
    .isNull-list {
        border: none;
    }
}
</style>
