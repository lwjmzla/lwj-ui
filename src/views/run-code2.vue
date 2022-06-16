<template>
  <div>
    <bb-image-upload
      :value="imagesValue"
      :limit="5"
      :size="0.5"
      @update="handleUpdate"
    ></bb-image-upload>
  </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue';

export default defineComponent({
  setup() {
    const imagesValue = ref(['https://img.ibaibu.com/baibu_9717ef59543444c7bae1f6b257fcf1d4.png'])
    const handleUpdate = (images:string[]) => {
      console.log(images)
    }
    return {
      imagesValue,
      handleUpdate
    }
  }
})
</script>

<style></style>