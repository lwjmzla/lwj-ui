<template>
  <bb-app-page :fheader="{showCollapse: true}">
    <template #fheader="{ collapse }">
      <el-form
        label-width="120px"
        label-position="left"
        @keyup.enter="handleSearch()"
      >
        <el-form-item label="" label-width="120px">
          <template #label>
            <el-select
              placeholder="请选择关键词"
              v-model="params.nameKey"
              value=""
            >
              <el-option
                v-for="item in queryOptions.nameKeys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
          <el-input
            placeholder="请填写"
            v-model.trim="params.nameValue"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="" label-width="120px">
          <template #label>
            <el-select
              placeholder="请选择关键词"
              v-model="params.idKey"
              value=""
            >
              <el-option
                v-for="item in queryOptions.idKeys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
         
          <el-input
            placeholder="请填写"
            v-model.trim="params.idValue"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item
          isCollapse
          label="基础类别1"
          prop="baseCategory"
        >
          <el-select
            placeholder="请选择"
            v-model="params.baseCategory"
          >
            <el-option
              v-for="item in queryOptions.baseCategories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
    
        <el-form-item
          class="label-te"
          isCollapse
          prop="baseCategory"
        >
          <template #label>
            <div>
              基础类别2
            </div>
          </template>
          <el-select
            placeholder="请选择"
            v-model="params.baseCategory"
          >
            <el-option
              v-for="item in queryOptions.baseCategories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="label-text"
          prop="baseCategory"
        >
          <template #label>
            <div>
              基础类别3
            </div>
          </template>
          <el-select
            placeholder="请选择"
            v-model="params.baseCategory"
          >
            <el-option
              v-for="item in queryOptions.baseCategories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="baseCategory"
          class="label-text"
        >
          <template #label>
            <div>
              基础类别4
            </div>
          </template>
          <el-input
            placeholder="请填写"
            v-model.trim="params.nameValue"
            clearable
          >
          </el-input>
        </el-form-item>

        <div v-show="collapse">展示div</div>

        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch()"
          >查询</el-button>
          <el-button
            @click="handleReset()"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #mainHeader>
      <el-row class="margin-bottom-10">
        <el-button>测试按钮</el-button>
        <bb-column-switch
          name="TEST_TABLE"
          v-model:columns="tableColumns"
          @refresh="()=> {
            $nextTick(() => {
              $refs.testTable.doLayout();
            });
          }"
        />
      </el-row>
    </template>

    <template #main="{height}">
      <el-row>
        <el-table
          ref="testTable"
          :height="height"
          v-loading="tableLoading"
          border
          :data="tableData"
        >
          <el-table-column
            label="商品名称"
            v-if="tableColumns.商品名称"
          >
            <template #default="{row}">
          {{ row.test || '-' }}
            </template>
          </el-table-column>

          <el-table-column
            label="数量"
            v-if="tableColumns.数量"
          >
            <template #default>
              <bb-input-number
                v-model="inputNumber"
                :precision="1"
                :min="1"
                :max="99999"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="重量"
            v-if="tableColumns.重量"
          >
            <template>
              10斤
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            v-if="tableColumns.单位"
          >
            <template>
              米
            </template>
          </el-table-column>
          <el-table-column
            label="时间"
            v-if="tableColumns.时间"
          >
            <template>
              2021年09月10日
            </template>
          </el-table-column>

          <el-table-column label="操作" v-if="tableColumns.操作">
            <template #default>
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="testDrawer.open">打开drawer</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </template>

    <template #ffooter>
      <el-row style="width:100%" justify="end">
        <bb-pagination
          :total="tableTotal"
          :current-page="params.pageNum"
          :size="params.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></bb-pagination>
      </el-row>
    </template>

    <bb-drawer-move
      ref='testDrawer'
      :size='700'
      :before-close="hadnleCloseDrawer"
      cache="TEST_DRAWER"
    >
      <template #header>
        <div>123</div>
        <el-button @click="hadnleCloseDrawer">关闭</el-button>
      </template>
      <div>
        <el-form
          label-width="30px"
          label-position="left"
        >
          <el-row :gutter="15">
            <el-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="8"
              :xl="6"
            >
              <el-form-item label='test'>
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="8"
              :xl="6"
            >
              <el-form-item label='test'>
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="8"
              :xl="6"
            >
              <el-form-item label='test'>
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="8"
              :xl="6"
            >
              <el-form-item label='test'>
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
        <el-button>确认</el-button>
      </template>
    </bb-drawer-move>
  </bb-app-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface SearchParamsType {
  nameValue: string;
  nameKey: string;
  idValue: string;
  idKey: string;
  baseCategory: string;
  pageNum: number;
  pageSize: number;
}

export default defineComponent({
  name: 'useList',
  setup() {
    const testDrawer = ref();
    const tableColumns = ref({
      商品名称: true,
      数量: true,
      重量: false,
      单位: true,
      时间: true,
      操作: true,
    });

    const params = ref<SearchParamsType>({
      pageNum: 32,
      pageSize: 10,
      nameValue: '',
      nameKey: '',
      idValue: '',
      idKey: '',
      baseCategory: '',
    })

    const tableData = ref([
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},
      {test: 123},


    ]);
    const tableTotal = ref(10);
    const tableLoading = ref(false);
    const inputNumber = ref();
    
    const handleSearch = () => {
      console.log(1)
    };
    const handleReset = () => {
      console.log(1)
    };
    const handleSizeChange = () => {
      console.log(1)
    };
    const handleCurrentChange = () => {
      console.log(1)
    };


    const hadnleCloseDrawer = () => {
      console.log('hadnleCloseDrawer');
      testDrawer.value.close();
    };

    return {
      tableColumns,
      testDrawer,
      params,
      tableData,
      tableTotal,
      tableLoading,
      inputNumber,
      hadnleCloseDrawer,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      queryOptions: {
        nameKeys: [
          { label: '档口/仓库名称', value: 'supplierName' },
          { label: '档口/仓库编码', value: 'supplierCode' },
          { label: 'GID', value: 'gid' },
        ],
        idKeys: [
          { label: 'SPU编码', value: 'commodityCode' },
          { label: '品名', value: 'commodityName' },
          { label: '货号', value: 'commodityNumber' },
          { label: '色号', value: 'colorNumber' },
          { label: 'PID', value: 'pid' },
          { label: 'SKU编码', value: 'skuCode' },
        ],
        baseCategories: [
          { label: '全部', value: '' },
          { label: '净色-针织', value: 'CATEGORY_NO1_1-CATEGORY_NO2_1' },
          { label: '净色-梭织', value: 'CATEGORY_NO1_1-CATEGORY_NO2_2' },
          { label: '净色-无纺', value: 'CATEGORY_NO1_1-CATEGORY_NO2_3' },
          { label: '花型-针织', value: 'CATEGORY_NO1_2-CATEGORY_NO2_1' },
          { label: '花型-梭织', value: 'CATEGORY_NO1_2-CATEGORY_NO2_2' },
          { label: '花型-无纺', value: 'CATEGORY_NO1_2-CATEGORY_NO2_3' },
        ],
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.use-list {
}
</style>
