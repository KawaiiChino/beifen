<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="header_main">
                <div class="left_box">
                    <img src="https://test.nttcc.com.cn/_nuxt/img/logo_1.e54ae31.png" alt="">
                    <h1>共创云</h1>
                </div>
                <div class="right_box">
                    <el-button type="primary">登录</el-button>
                    <el-button>注册</el-button>
                </div>
            </div>
        </el-header>
    </el-container>
    <div class="resource_search">
        <div class="panel">
            <div class="panel_header">
                <div class="title_box">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAABHNCSVQICAgIfAhkiAAAAUhJREFUOE/tlL9Kw1AYxc9JCyIodLKLID5Bi6MI/kFdipgOtmP7JtY3SUd1aKR1UdEO4ijtE4jgUqeCgghJjyRaiMQ0qVJcmuly8/vOuTn3y0ckeMyGMjPpQUVE1cMpWO+OUbeL7MeVcxRQasoE3ApJ8ydOkk0jZR0XeBalEzI4OFeeGlQgVElk4k7ovZfQB2GJRv20wE6wxjcIRkAgn0Q0ihHQCUbIcsuxAe7/RTTSzIuw3HI1CfGhZugOSk23RuLwK9ujk71UzVuPux8yuO4pR8C8un8rPvWcnN+OjvvIgR58M4PLSqeWRu0vZtPd7ZXZhgB7K8uuzw6dbp7ldY51cfuCy7vXX6W2szqH3bV5T7W6ucD61CAU4zSi2M7634gm/qMNv3/ckRDFfxsVQSg26ISABH+O8VNc6wA3EtYmxNQW2Z74uP4A+kAQbn8IYmUAAAAASUVORK5CYII="
                        alt="">
                    <p>资源大厅</p>
                </div>
                <div class="search_box">
                    <div class="search_group" :inline="true">

                        <el-input placeholder="请输入" class="input" @focus="focus">

                        </el-input>
                        <div class="search_btn">
                            <el-button type="primary" icon="search">搜索</el-button>
                        </div>

                    </div>

                </div>

            </div>
            <div class="panel_tabs">
                <div class="tabs_item">
                    <p>服务</p>
                </div>
            </div>
            <div class="panel_main">
                <div class="panel_condition">
                    <div class="condition">
                        <p class="condition_label">
                            服务类型：
                        </p>
                        <div class="condition_list">
                            <p v-for="service in service_type_list" class="condition_list_item">
                                {{ service.name }}
                            </p>
                        </div>
                    </div>
                    <div class="condition">
                        <p class="condition_label">
                            技术领域：
                        </p>
                        <div  class="condition_list">
                            <p v-for="tech in technical_list" class="condition_list_item" @click="activeDiv(tech.id)" :class="{selected:i===tech.id}">
                                {{ tech.name }}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <el-button @click="getServiceList">getTechList</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            technical_list: [],
            service_type_list: [],
            condition_choose: {
                pageNum: "",
                technicalId:"",
            },
            i: 0,
        }
    },
    methods: {
        activeDiv(technicalId) {
            console.log('activeDiv执行了'+technicalId)
            this.condition_choose.technicalId = technicalId;
            this.i=technicalId

        },
        login() {

            window.sessionStorage.setItem('token', '123')

            this.$axios.get('https://service.test.nttcc.com.cn/admin/api/v1/service_type/ladderlist').then(function (response) {
                console.log(response);

            })
            console.log('login函数运行了')
            this.$router.push('search');

        },
        async getTechList() {
            // const { data: res } = await this.$axios.get('https://service.test.nttcc.com.cn/api/v1/technical/list').then(function (response) {
            //     console.log(response);

            // })
            const { data: res } = await this.$axios.get('https://service.test.nttcc.com.cn/api/v1/technical/list');
            // if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
            this.technical_list = res.data.list;
            console.log(res.data.list);
            
        },
        async getServiceList() {
            // const { data: res } = await this.$axios.get('https://service.test.nttcc.com.cn/api/v1/technical/list').then(function (response) {
            //     console.log(response);

            // })
            const { data: res } = await this.$axios.get('https://service.test.nttcc.com.cn/admin/api/v1/service_type/ladderlist');
            // if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
            this.service_type_list = res.data;
            console.log(res.data);
        },
    },
    created() {
        this.getTechList();
    },
}
</script>
<style>

.home-container {
    display: flex;
    width: 100%;
    min-width: 1240px;
}

h1 {
    font-size: 16px;
    color: #3473e6;
}

.resource_search {
    background-color: #f6f7f8;
    padding: 30px 0;
    height: 100%;

    .panel {
        width: 1200px;
        height: 100%;
        padding: 30px;

        margin: 0 auto;
        background-color: #fff;
        box-shadow: 0 0 6px rgba(0, 0, 0, .06);
        border-radius: 4px;
        overflow: auto;

        .panel_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 40px;
            margin-bottom: 20px;

            .title_box {
                display: flex;
                height: 22px;
                align-items: center;

                >p {
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 22px;
                    color: #303133;
                }
            }

            .search_box {
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


        }

        .panel_tabs {
            display: flex;
            align-items: center;
            width: 100%;
            height: 48px;
            padding: 0 30px;
            margin-bottom: 10px;
            background: #f7f8f9;
            border-radius: 4px;

            .tabs_item {
                color: #3473e6;
                margin-right: 120px;
            }
        }

        
    }
}
.panel_main {
            width: 100%;
            padding: 0 20px;
            margin-bottom: 30px;
            background: #fff;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
        }
.condition{
    display: flex;
    .condition_list{
        flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 74px;

    }
    .condition_list_item{
        cursor: pointer;
    line-height: 20px;
    padding: 5px 10px;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 2px;
    color: #303133;
    }
    .selected{
    color: #fff;
    background-color: #3473e6;
}
}
.condition_label{
    width: 120px;
    line-height: 30px;
    padding-left: 10px;
    margin-top: 10px;
    color: #909399;
    font-size: 14px;
}
.el-header {
    /* background-color: #49b6ff; */
    /* display: flex; */
    justify-content: space-between;
    /* padding-left: 0; */
    width: 100%;
    height: 50px;
    align-items: center;
    color: #fff;
    font-size: 20px;

    .header_main {

        display: flex;
        width: 1200px;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
    }

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }

    }

    .left_box {
        display: flex;
        align-items: center;
        margin-right: 50px;
    }
}
</style>