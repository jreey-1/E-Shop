<template>
    <el-card class="box-card">
		<div slot="header" class="clearfix box-card-title">
			<span>账户信息</span>
		</div>
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
				<el-form-item label="账户" class="label" prop="username">
					<el-input disabled v-model="form.username" placeholder="请输入账户名"></el-input>
				</el-form-item>
				
				<el-form-item label="姓名" class="label" prop="fullname">
					<el-input v-model="form.fullname" placeholder="请输入姓名"></el-input>
				</el-form-item>
				
				 <el-form-item label="性别" prop="sex">
				    <el-radio-group v-model="form.sex">
				      <el-radio label="男"></el-radio>
				      <el-radio label="女"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				
				<el-form-item label="手机" class="label" prop="tel">
					<el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
				</el-form-item>

                <el-form-item label="头像" class="label" prop="avatar">
					<singleupload :type='type.type' :url.sync="form.avatar"></singleupload>
				</el-form-item>	
				
				<el-form-item class="btn-box">
					<el-button type="primary" @click="handleUpload('form')">保存修改</el-button>
				</el-form-item>
			</el-form>
     </el-card>
</template>

<script>
	import { mapState,mapGetters,mapMutations } from 'vuex';
    import {Admin} from '@/api/index'
    import singleupload from '@/components/SingleUpload-element.vue';

    export default{
        components: { singleupload },
        data(){
            return{
                form:{},
                type:{
					type:"avatar",
                },               
                rules:{
					username:[{
						required: true,
						message: '请输入账户名',
						trigger: 'blur'
					},{
						min: 3,
						max: 20,
						message: '账户名长度为3-20位字符',
						trigger: 'blur'
					}],
					fullname:[{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					},{
						pattern: /^[\u4e00-\u9fa5]{2,6}$/,
						message: '请输入正确格式的姓名',
						trigger: 'blur'
					}],
					sex:[{ required: true, message: '请选择性别', trigger: 'change'}],
					tel:[{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					},{
						pattern: /^1[3456789]\d{9}$/,
						message: '请输入正确的手机号',
						trigger: 'blur'
                    }],              
					avatar:[{
						required: true,
						message: '请上传一张头像',
						trigger: 'blur'
					}],
				}
            }
        },
        methods:{
            async loadInfos(id){
                let { status, data} = await Admin.info(id);
                if(status){
                    this.form = data;
                }
            },
            handleUpload(form){
                // 保存修改
                this.$refs[form].validate(async (valid) =>{
					if(valid){
					let { status,msg} = await this.$store.dispatch('user/uploadInfo',{...this.form})
						if(status){
							this.$message.success(msg)	
						}else{
							this.$message.error(msg)	
						}
					}
				})
            }
        },
		computed:{
			// ...mapState(['info']),
		},
        created(){
            // let { id } = sessionStorage;
            // this.loadInfos({id});
			this.form = {...this.$store.state.user.info};
        },
		beforeUpdate() {
			// this.form = {...this.$store.state.info};
		},
        mounted(){
            document.title = "账户信息"
        }

    }
</script>

<style>
</style>
