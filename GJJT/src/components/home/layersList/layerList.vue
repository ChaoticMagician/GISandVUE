<template>
  <ul class="Layer-list"  >
    <li 
    class="Layer-list-li"
    v-for="trem in listdata"
    :key="trem.id"
    @click="[chanceLayerid(trem.id,!trem.visible),trem.visible=!trem.visible]"
    >
      <i :class="['toolsLIstIcon','iconfont',trem.visible? 'icon-ditu':'icon-fangda']" />
      <span class="Layer-list-li-span">{{trem.title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name:'layerList',
  data(){
    return{
      listdata: window.arcgis.layersList,
    }
  },
  methods:{
      chanceLayerid(chancedlayerid,visible){
        this.$emit('chance-layers-even',chancedlayerid,visible)
      }
  }
}
</script>

<style scoped>
.Layer-list{
  display: flex;
  list-style: none;
  width: 390px;
  flex-wrap:wrap;
}
.Layer-list-li-span {
  background: white;
  text-align: center;
}
.Layer-list-li{
    float: left;
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 1%;
    margin-bottom: 1%;
    color: #3e3e3e;
}
.Layer-list-li:hover{
  color:rgba(92, 142, 223, 0.822)
}
</style>

