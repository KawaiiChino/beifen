<template>
    <div class="box">

        <div class="subjectbox">
            <!-- 不能用@current-change="handleCurrentChange" highlight-current-row-->
            <el-table :data="MySubject" stripe style="width: 100%" row-key="id">

                <el-table-column label="id" width="180">
                    <template #default="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column prop="name" label="科目名称" width="180">

                </el-table-column>
                <el-table-column prop="grade" label="年级" width="180">

                </el-table-column>
                <el-table-column prop="zhuanye" label="专业">

                </el-table-column>
                <el-table-column prop="zhuanye" label="操作">
                    <template #default="scope">
                        <!-- @click="editinfo(scope.row.id)" -->
                        <el-button size="small" type="primary" @click="editinfo(scope.row.id)" plain>
                            修改
                        </el-button>
                        <el-button size="small" type="danger" @click="handleEdit(scope.row.id)" plain>
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>


        </div>
        <!-- 弹出框el-dialog -->
        <el-dialog v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :title="dialogtitle">
            
            <el-form :model="setSubject">
                <el-form-item label="学科ID" :label-width="formLabelWidth">
                    <el-input v-model="setSubject.id" placeholder="id" />
                </el-form-item>
                <el-form-item label="学科名" :label-width="formLabelWidth">
                    <!-- <el-select v-model="setSubject.name" placeholder="Please select a zone">
                        <el-option label="Zone No.1" value="shanghai" />
                        <el-option label="Zone No.2" value="beijing" />
                    </el-select> -->
                    <el-input v-model="setSubject.name" placeholder="name" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addSubject">新增科目</el-button>
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <div class="addsubject">
            <el-text class="mx-1">学科ID:</el-text><el-input v-model="setSubject.id" placeholder="id" />
            <el-text class="mx-1">名称:</el-text> <el-input v-model="setSubject.name" placeholder="科目名称" />
            <el-text class="mx-1">年级:</el-text> <el-input v-model="setSubject.grade" placeholder="年级" />
            <el-text class="mx-1">专业:</el-text> <el-input v-model="setSubject.zhuanye" placeholder="专业" />

        </div>
        <el-button @click="showaddSubject">弹出新增科目</el-button>
        <el-button @click="getSubject">获取全部</el-button>

        <el-button @click="delSubjectbyid">删除指定id科目</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            MySubject: [],
            setSubject: { "id": null, "name": "", "grade": "", "zhuanye": "" },
            dialogFormVisible: false,
            dialogtitle: "",
            formLabelWidth : '140px',
        }
    },
    methods: {
        getSubject() {
            console.log('查询函数getSubject');
            this.$axios.get('http://localhost:8080/subject/queryall')
                .then(resp => {
                    // console.log(resp);
                    // console.log(resp.data);
                    this.MySubject = resp.data;
                })
            //   因为用了 function 函数 的原因，
            // 在函数里面，this是指向函数本身，已经不是外部的默认this了
            // const { data: res } = await this.$axios.get('http://localhost:8080/subject/queryall')
            //     .then(function (response) {
            //     console.log(response);
            // })
            console.log('查询完毕');
        },
        addSubject() {
            this.$axios({
                method: 'post',
                url: 'http://localhost:8080/subject/addsubject',
                data: this.setSubject,
            }).then(resp => {   //改为箭头函数
                console.log(resp);
                console.log(resp.status);
                console.log(resp.data);
                if (resp.data.code == 200)
                    this.$message.info("成功");
                else
                    this.$message.info("失败");
                
                this.getSubject();

            }).catch((error)=> {
                this.$message.info(error);
            })

        },
        // 根据id删除
        delSubjectbyid() {
            // console.log(this.setSubject.id);
            // console.log(typeof (this.setSubject.id));
            // let id = this.setSubject.id + 0;
            // console.log(typeof (id));
            // this.$axios({
            //     method: 'post',
            //     url: 'http://localhost:8080/subject/delsubject',
            //     data: id,
            // }).catch(() => { console.log('请求未成功'); }).then(resp => {        //改为箭头函数
            //     console.log(resp);
            //     console.log(resp.data);
            // })
            this.$axios({
                method: 'post',
                url: 'http://localhost:8080/subject/delsubject',
                data: this.setSubject,
            }).catch(() => { console.log('请求未成功'); }).then(resp => {        //改为箭头函数
                // console.log(resp);
                // console.log(resp.data);
                this.getSubject();
            })
            console.log('delSubjectbyid函数结束');
        },
        // 
        handleCurrentChange(val) {
            console.log(val);
            console.log(val.id);

            this.setSubject.id = val.id
        },
        editinfo(id) {
            this.dialogFormVisible = true;
            this.dialogtitle = "编辑"
            this.setSubject.id = id;
        },
        // handleEdit编辑按钮


        handleEdit(id) {

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                console.log("id:" + id);
                this.setSubject.id = id;

                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8080/subject/delsubject',
                    data: this.setSubject,
                }).catch(() => { console.log('请求未成功'); }).then(resp => {        //改为箭头函数
                    // console.log(resp);
                    // console.log(resp.data);
                    this.getSubject();
                    this.$message.success('恭喜！删除成功！')
                })
                console.log('delSubjectbyid函数结束');
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        showaddSubject() {
            this.dialogFormVisible = true;
            this.dialogtitle = "新增科目"
            this.setSubject.id = id;
        }
    },
    mounted() {
        this.getSubject();
    }
}


</script>

<style scoped>
.box {
    margin: 20px;
    /* width: 800px; */
}

.el-table {
    width: 100%;
}

.el-input {
    margin-right: 10px;
    /* width: 100px; */
}

.subjectbox {
    width: 100%;
}

.el-dialog_header {
    border-bottom: 1px solid #e8eaec;
}

.el-dialog__footer {
    border-top: 1px solid #757575;
}
</style>