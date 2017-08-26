var app = new Vue({
  el: "#app",
  data:{
    leaders : [],
    loaded: false
  },
  created:function(){
    let url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    const _s = this;
    $.get(url, function (data) {
      _s.leaders = data;
      _s.loaded = true;
    })
  },
  methods:{
    sortForRecent(e, type){
      e.preventDefault();
      this.leaders = this.getSorted("recent");
    },
    sortForAllTime(e){
      e.preventDefault();
      this.leaders = this.getSorted("alltime");
    },
    getSorted(type){
      return this.leaders.sort(function (a, n) {
        return parseInt(n[type], 10) - parseInt(a[type], 10);
      })
    }
  }
})