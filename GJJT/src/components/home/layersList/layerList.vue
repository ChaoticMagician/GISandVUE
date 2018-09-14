<template>
  <ul class="Layer-list"  >
    <li 
    class="Layer-list-li"
    v-for="trem in listdata"
    :key="trem.id"
    @click="chanceBasemap(trem.id)"
    >
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
    //   imgurl:{dianziimgurl,yingxiangimgurl}
    }
  },
  methods:{
      chanceBasemap(chancedlayerid){
        this.$emit('chance-layers-even',chancedlayerid)
        console.log(this.listdata);
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
  /* position: absolute;
  margin-top: -110px;
  margin-left: 12px; */
  background: white;
  text-align: center;
  color: #3e3e3e;
}
</style>

