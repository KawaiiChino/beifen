<template>
    <div class="filelist">
        <div class="subject" @mouseleave="mouseout">
            <el-card class="box-card">
                <el-button type="primary" plain @click="getfilename">获取文件名</el-button>
                <el-button type="primary" plain @click="getPdfCode">更新</el-button>
                <div class="tab" v-for="(item, index) in filenamelist" :key="index" :class="{ active: activeID === index }"
                    @click="setgoalfilename(item)">
                    {{ item }}
                </div>
            </el-card>



        </div>
    </div>
    <div class="preview">
        <div class="pdfpreview" v-show="showpdf" ref="file"></div>
        <div class="imgpreview" v-show="showimg">
            <img :src="imgsrc">

        </div>
    </div>
</template>
  
<script >
import * as docx from "docx-preview";
// import { Loading } from "element-plus";
export default {
    data() {
        return {
            filenamelist: ["badapple歌词.docx", "stamp0001.png", "国家奖助学金申请流程 2022(1)(1)(1).docx", "学生离郑返乡证明(1)段延煦.docx"],
            activeID: 0,
            i: 0,
            goalfilename: "国家奖助学金申请流程 2022(1)(1)(1).docx",
            imgsrc: '',
            showpdf: true,
            showimg:false,

        }
    },

    created() {
        //   loading = Loading.service({ //开始loading加载动画
        //     lock: true,
        //     text: "报告文件加载中...",
        //     background: "rgba(0, 0, 0, 0)",
        //   });
        this.getfilename();
        this.getPdfCode();

    },

    methods: {
        getPdfCode() {
            // if (this.getFileType(this.goalfilename) == 'word') {
            //     console.log('goalfilename=== \'word\'');
                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/file/' + this.goalfilename,
                    // data: this.setSubject,
                    responseType: 'blob',
                }).then(({ data }) => {
                    docx.renderAsync(data, this.$refs.file) // 渲染到页面
                    // loading.close();//关闭loading
                })
            // }
        },
        getfilename() {
            
            this.$axios({
                method: 'get',
                url: 'http://localhost:8080/file/getallfilename',
                // data: this.setSubject,
            }).then(({ data }) => {
                this.filenamelist = data;
                console.log(data);
                console.log(this.filenamelist);
                console.log(this.goalfilename);
            })
        },
        setgoalfilename(item) {
            this.goalfilename = item;

            if (this.getFileType(item)==='word')
            {
                this.getPdfCode(); 
                this.showimg = false;
                this.showpdf = true;
            }
            if (this.getFileType(item) === 'image') {
                this.imgsrc = 'http://localhost:8080/file/' + this.goalfilename;
                console.log(this.imgsrc );
                this.showpdf = false;
                this.showimg = true;
            }
        },
        
        getFileType(fileName) {
            // 后缀获取
            let suffix = '';
            // 获取类型结果
            let result = '';
            try {
                const flieArr = fileName.split('.');
                suffix = flieArr[flieArr.length - 1];
            } catch (err) {
                suffix = '';
            }
            // fileName无后缀返回 false
            if (!suffix) { return false; }
            suffix = suffix.toLocaleLowerCase();
            // 图片格式
            const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
            // 进行图片匹配
            result = imglist.find(item => item === suffix);
            if (result) {
                return 'image';
            }
            // 匹配txt
            const txtlist = ['txt'];
            result = txtlist.find(item => item === suffix);
            if (result) {
                return 'txt';
            }
            // 匹配 excel
            const excelist = ['xls', 'xlsx'];
            result = excelist.find(item => item === suffix);
            if (result) {
                return 'excel';
            }
            // 匹配 word
            const wordlist = ['doc', 'docx'];
            result = wordlist.find(item => item === suffix);
            if (result) {
                return 'word';
            }
            // 匹配 pdf
            const pdflist = ['pdf'];
            result = pdflist.find(item => item === suffix);
            if (result) {
                return 'pdf';
            }
            // 匹配 ppt
            const pptlist = ['ppt', 'pptx'];
            result = pptlist.find(item => item === suffix);
            if (result) {
                return 'ppt';
            }
            // 匹配 视频
            const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
            result = videolist.find(item => item === suffix);
            if (result) {
                return 'video';
            }
            // 匹配 音频
            const radiolist = ['mp3', 'wav', 'wmv'];
            result = radiolist.find(item => item === suffix);
            if (result) {
                return 'radio';
            }
            // 其他 文件类型
            return 'other';
        }



    }
}
</script>
<style scoped>
.filelist {
    width: 500px;
    top: 200px;
}

.tab {
    margin-top: 20px;
    padding: 5px;
    border: 1px solid #96c2f1;
    background: #eff7ff
}

.preview {
    width: 600px;
    margin: 100px;
}
/* .imgpreview{
    display: none;
} */
</style>