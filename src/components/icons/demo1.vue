<template>
  <div class="box">
    <div class="item" @click="handleClick('add-location')">
      <el-icon><add-location /></el-icon>
    </div>
    <div class="item" @click="handleClick('aim')">
      <el-icon><aim /></el-icon>
    </div>
    <div class="item" @click="handleClick('alarm-clock')">
      <el-icon><alarm-clock /></el-icon>
    </div>
    <div class="item" @click="handleClick('apple')">
      <el-icon><apple /></el-icon>
    </div>
    <div class="item" @click="handleClick('arrow-down-bold')">
      <el-icon><arrow-down-bold /></el-icon>
    </div>
    <div class="item" @click="handleClick('arrow-down')">
      <el-icon><arrow-down /></el-icon>
    </div>
    <div class="item" @click="handleClick('arrow-left-bold')">
      <el-icon><arrow-left-bold /></el-icon>
    </div>
  </div>
</template>

<script>
import clipboardCopy from '../demo-block/demoblock/clipboard-copy';

export default {
  name: 'IconsDemo1',
  data() {
    return {
      searchIcon: '',
      iconList: []
    };
  },
  methods: {
    async handleClick(component) {
      const code = `<el-icon><${component} /></el-icon>`;
      await clipboardCopy(code)
      this.$message({
        message: `${code} copied 🎉`,
        type: 'success'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 6);
  height: 120px;
  color: #666;
  margin-right: -1px;
  margin-bottom: -1px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #1f93ff;
    .icon {
      color: #fff;
      transform: scale(1.4);
    }
    .icon-text {
      color: #fff;
    }
  }
}

.box-search {
  margin-top: 24px;
  margin-bottom: 24px;
}

.el-icon{
  font-size: 24px;
}
</style>
