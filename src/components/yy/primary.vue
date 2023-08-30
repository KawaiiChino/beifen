<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="header_main">
                <div class="left_box">
                    <img src="@/assets/img/档案.svg" alt="">
                    <h1>abcabc</h1>
                </div>
                <div class="right_box">
                    <el-button type="primary">登录</el-button>
                    <el-button>注册</el-button>
                </div>
            </div>
        </el-header>
    </el-container>
    <div class="roof">
        <div class="roof-inner">
            <div class="search_box">
                <div class="search_group" :inline="true">

                    <el-input placeholder="请输入" class="input" @focus="focus">

                    </el-input>
                    <div class="search_btn">
                        <el-button type="primary" icon="search">搜索</el-button>
                    </div>

                </div>

            </div>

            <!-- 学科导航 -->
            <div id="indexva" >
                <!-- 
                    如何解决鼠标移动到子元素 会触发父元素的mouseout事件
                    用mouseleave/mouseenter代替mouseover/mouseout

mouseover与mouseenter

mouseover => 不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
mouseenter => 只有在鼠标指针从元素外穿入被选元素（到元素内）时，才会触发 mouseenter 事件。

mouseout与mouseleave

mouseout => 不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。
mouseleave => 只有在鼠标指针从元素内穿出被选元素（到元素外）时，才会触发 mouseleave 事件。
                 -->
                <div class="subject"   @mouseleave="mouseout">
                    <!-- 大分类 -->
                    <div class="tab" @mouseenter="mouseenter">
                        <!-- <span class="name active" data-levelid="2" @click="tracker">小学</span>
                        <span class="name" data-levelid="3" @click="tracker">初中</span>
                        <span class="name" data-levelid="4" @click="tracker">高中</span> -->
                        <span class="name" v-for="(item, index) in sub2" :key="index"
                            :class="{ active: activeID === index }" @click="activespan(index)">
                            {{ index }}
                        </span>
                    </div>
                    <!-- 小列表 -->
                    <div class="tab-wrap" v-show="showtabwrap">
                        <ul class="tab-content" v-for="(item, index) in sub2" :key="index" v-show="index == activeID">
                            <li v-for="i in item">{{ i }} <i class="iconfont icon-sanjiao"></i></li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="uploadfile">
        <form action="http://localhost:8080/up" method="post" enctype="multipart/form-data">

            <input type="file" id="file" name="f" multiple />

            <input type="submit" value="提交">
        </form>
        <el-upload action="http://localhost:8080/file/up" :on-preview="handlePreview" :limit="10" method="post"
            enctype="multipart/form-data" type="file">
            <!-- accept=".pdf" -->

            <el-button size="medium" type="primary" id="file" name="f" multiple>点击</el-button>
            <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
            <div slot="tip" class="el-upload-tip">只能上传pdf</div>
        </el-upload>
    </div>
    <!-- <iframe src="http://localhost:8080/41060122-33506273.pdf" height="900px;" width="800px"></iframe> -->
    <!-- <div class="resource_search">

        <div class="panel">
            
        </div>

    </div> -->
    <div class="preview">
    <docxpreview></docxpreview>
</div>
</template>

<script>

import docxpreview from './docxpreview.vue';
export default {
    data() {
        return {
            subject: [['语文', '数学', '英语', '科学', '道德与法治'], ['语文', '数学', '英语', '物理', '化学', '生物'], ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史']],
            sub2: {
                "小学": ['语文', '数学', '英语', '科学', '道德与法治'],
                "初中": ['语文', '数学', '英语', '物理', '化学', '生物'],
                "高中": ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史']
            },
            // 被激活的学科列表
            gradeActive: '',
            activeID: 2,
            showtabwrap: 0,
        }
    },
    methods: {
        tracker() {
            this.activeID = this.data - levelid;

        },
        activespan(index) {
            this.activeID = index;
        },
        mouseenter() {
            this.showtabwrap = 1
            console.log('mouseover' + this.showtabwrap);

        },
        mouseout() {
            this.showtabwrap = 0
            console.log('mouseout' + this.showtabwrap);
        }
    },
    mounted() {
        this.activespan("小学");
    }

}

</script>
<style scoped>
body {
    background-color: #F1F2F5
}

.el-header {
    /* background-color: #ededed; */
    height: 36px;
    background: #f6f7f9;
    border-bottom: 1px solid #e6e7e9;
    height: 100%;
}


.home-container {
    display: flex;
    width: 100%;
    min-width: 1240px;
}

h1 {
    font-size: 16px;
    color: #3473e6;
}

.left_box {
    >img {
        height: 50px;
    }
}

.search_box {
    position: absolute;
    left: 315px;
    top: 27px;
    width: 540px;

    /* display: inline; */

    .search_group {
        line-height: normal;
        display: flex;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;

        height: 40px;
        line-height: 40px;

        .input {
            height: 40px;
        }

        .search_btn {
            /* display: table-cell; */
            /* position: relative; */
            border-radius: 4px;

            /* padding: 0 20px; */
            .el-button {
                height: 100%;
            }
        }
    }
}

.roof {
    background-color: #fff;

    >.roof-inner {
        position: relative;
        margin: 0 auto;
        width: 1200px;
        height: 143px;


    }
}

.subject {
    position: absolute;
    top: 101px;
    left: 0;
    width: 215px;
    z-index: 3;
    box-sizing: unset;

    >.tab {
        background: #0080ff;
        width: 215px;
        height: 42px;
        font-size: 0;
        text-align: center;
        -webkit-box-sizing: unset;
        box-sizing: unset;

        >.name {
            position: relative;
            display: inline-block;
            height: 41px;
            line-height: 41px;
            width: 71px;
            font-size: 16px;
            color: #d9ecff;
            margin-top: 1px;
            text-align: center;
            cursor: pointer;
        }

        >.active {
            color: #0080ff;
            background: #fff;
        }


    }
}

.tab-wrap {
    /* display: none; */
    position: absolute;
    top: 42px;
    left: 0;
    z-index: 4;
    background: #FFFFFF;
    border: 1px solid #e5e6e8;
    -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 362px;


}

.tab-wrap li {
    list-style: none;
    height: 33px;
    line-height: 33px;
    padding: 0;
    margin: 0%;
}

.tab-wrap ul {
    padding-left: 20px;
}

.tab-content i {
    position: absolute;
    right: 15px;
    font-size: 12px;
    color: #b2d8ff;

}

.tab-content i::before {
    content: "";
    width: 10px;
    height: 10px;
    border: solid #b2d8ff;
    border-width: 0 2px 2px 0;
    transform: translate(-30%, 100%) rotate(-45deg);
    position: absolute;
    left: 50%;
    top: 50%;
}
.uploadfile{
    position: absolute;
    left: 450px;
}
.preview{
    margin-top: 100px;
    margin-left: 100px;
}
</style>