<template>
	<div>
		<div ref="editor" style="text-align:left"></div>
	</div>
</template>

<script>
	import E from 'wangeditor'
	export default {
		name: 'editor',
		props: ['Content'],

		data() {
			return {
				editorContent: ''
			}
		},
		methods: {
			getContent: function() {
				alert(this.editorContent)
			}
		},
		mounted() {
			var editor = new E(this.$refs.editor)
			editor.customConfig.zIndex = 100
			//      配置上传图片
			//      editor.customConfig.uploadImgServer='/api/upload/editor/';
			editor.customConfig.uploadImgShowBase64 = true;
			editor.customConfig.uploadFileName = 'file'
			editor.customConfig.onchange = (html) => {
				this.editorContent = html;
				this.$emit('update:Content', html)
			}
			editor.create()
		}
	}
</script>

<style scoped>
</style>
