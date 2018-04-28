
import wangEditor from 'wangeditor'

export const editor = {
    data () {
        return {
            editor: null
        }
    },
    methods: {
        initEditor (param) {
            this.editor = new wangEditor('#editor-trigger')
            // 实例
            this.editor.create();
        }
    }
}