<template>
<div>
    <div>
      {{map}}
      {{this.$store.state.map.demo}}
    </div>

     <p>
       <button @click="$store.commit('set_demo','这是我改动的demo')">这是我改动的demo</button>
       <button @click="$store.commit('set_demo','这是另外人员的改动')">这是另外人员的改动</button>
    </p>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      map: this.$store.state.map.demo
    }
  },
  computed:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
