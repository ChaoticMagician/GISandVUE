<template>
    <div id="home-slot"  >
      <slot :myBaseMap='myBaseMap' >
          <p>地图组件加载失败</p>
      </slot>
    </div>
</template>

<script>
export default {
    name:'modelmap',
    data(){
        return{
            myBaseMap:{}
        }
    },
  mounted:function(){

  },
  methods: {
  }
}
</script>

<style >
  #home-slot {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
</style>
