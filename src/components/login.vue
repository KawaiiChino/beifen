<template>
<el-button type="primary" @click="login">进入search页面</el-button>
<el-button type="primary" @click="practice">进入practice页面</el-button>
<el-button @click="primaryEnglish">Primary</el-button>
<el-button @click="toMysubject">toMysubject</el-button>
</template>
<script>
export default {
    
    methods: {
        login() {
            
            window.sessionStorage.setItem('token', '123')
            
            this.$axios.get('https://service.test.nttcc.com.cn/admin/api/v1/service_type/ladderlist').then(function (response) {
                console.log(response);
                
            })
            console.log('login函数运行了')
            this.$router.push('search');

        },
        async getMenuList() {
            const { data: res } = await this.$axios.get('menus');
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
            this.menulist = res.data;
            console.log(res);
        },
        practice() {
            window.sessionStorage.setItem('token', '123')
            this.$router.push('practice');
        },
        primaryEnglish() {
            window.sessionStorage.setItem('token', '123')
            this.$router.push('primaryEnglish');
        },
        toMysubject() {
            window.sessionStorage.setItem('token', 'mysubject')
            this.$router.push('mysubject');
        },
    }
}
</script>
