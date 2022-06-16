<template>
  <el-button
    class="bbui-button"
    v-bind="$attrs"
    :style="btnStyle"
  >
    <slot></slot>
  </el-button>
</template>
<script lang="ts">
import {defineComponent,computed} from 'vue'
export default defineComponent({
  name: 'bb-button',
  inheritAttrs: false,
  props: {
    width: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const btnStyle = computed(() => {
      const ret: Record<string,any> = {};
      if (props.width) {
        ret['width'] = setToPx(props.width);
      }
      return ret;
    })
    const setToPx = (value: number) => {
      return value + 'px';
    }
    return {
      btnStyle,
      setToPx
    }
  }
})
</script>
