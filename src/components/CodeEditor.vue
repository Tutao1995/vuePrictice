<template>
    <div>
        <prism-editor class="my-editor" readonly v-model="code" :highlight="highlighter" line-numbers></prism-editor>
    </div>
</template>
  
<script>
// import Prism Editor
import { PrismEditor } from "vue-prism-editor"; //
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
    props: {
        code: {
            type: String,
            default: 'console.log("Hello World")'
        }
    },
    components: {
        PrismEditor,
    },
    setup() {
        const highlighter = (code) => {
            return prism.highlight(code, prism.languages.js);
        };
        return { highlighter };
    },
});
</script>
  
<style>
.my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
    outline: none;
}

.height-200 {
    height: 200px;
}

.mb-4 {
    margin-bottom: 1rem;
}
</style>
  