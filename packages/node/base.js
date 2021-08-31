console.log(this);//{}
(() => {
  console.log(this)//{}
})();
(function() {
  console.log(this)//global
})()