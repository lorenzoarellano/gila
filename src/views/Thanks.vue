<template>
  <div>
    <Navbar />
    <Thanks />
    
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Thanks from '@/components/Thanks.vue'
export default {
  name: "Home",
  components:{
    Navbar,
    Thanks
  }
};
</script>
