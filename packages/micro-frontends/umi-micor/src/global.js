if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  console.log('window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__',window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

console.log('----2222------')
export async function bootstrap (props) {
  console.log('app1 bootstrap', props);
}
// 应用 render 之前触发
export async function mount(props) {
  console.log('app1 mount', props);
}
// 应用卸载之后触发
export async function unmount(props) {
  console.log('app1 unmount', props);
}
