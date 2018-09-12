<template>
  <ul class="base-map-list"  >
    <li 
    class="base-map-list-li"
    v-for="trem in listdata"
    :key="trem.key"
    @click="chanceBasemap(trem.key)"
    >
    <img :src='trem.type=="dianzi"? imgurl.dianziimgurl:imgurl.yingxiangimgurl' alt="">
    <span class="base-map-list-li-span">{{trem.title}}</span>

    </li>
  </ul>
</template>

<script>
import dianziimgurl from '@/assets/mapimg/instmap.png';
import yingxiangimgurl from '@/assets/mapimg/sanwei1.png';
export default {
  name:'baseMapList',
  data(){
    return{
      listdata: window.arcgis.baseMapList,
      imgurl:{dianziimgurl,yingxiangimgurl}

    }
  },
  methods:{
      chanceBasemap(newBasemap){
        this.$emit('chance-basemap-even', newBasemap)
        console.log(this.listdata);
      }
  }

}
</script>

<style scoped>
.base-map-list{
  display: flex;
  list-style: none;
  width: 390px;
  flex-wrap:wrap;
}
.base-map-list-li-span {
  position: absolute;
  margin-top: -110px;
  margin-left: 12px;
  background: white;
  text-align: center;
  color: #3e3e3e;
}
</style>

