// import directives
import { App } from "vue";
// import draggable from "./modules/draggable";
// import debounce from "./modules/debounce";
// import copy from "./modules/copy";
// import throttle from "./modules/copy";

const directivesList: any = {
  // draggable,
  // debounce,
  // copy,
  // throttle
};

console.log(directivesList)

const metaDirectives = import.meta.globEager("./modules/*.ts");
console.log(metaDirectives)
Object.keys(metaDirectives).forEach(item => {
  const key = item.replace('./modules/', '').replace('.ts', '')
  directivesList[key] = metaDirectives[item].default
});

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      // 注册自定义指令
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;