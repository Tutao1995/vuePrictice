<template>
    <div class="wrapper" ref="wrapper">
        <div class="table-wrapper">
            <el-table
                :data="tableData"
                style="width: 100%"
                :max-height="tableHeight"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column
                    v-for="column of tableColumn"
                    :prop="column.prop"
                    :label="column.label"
                    :key="column.prop"
                />
            </el-table>
        </div>
        <div class="page-wrapper">
            <el-pagination
                v-model:currentPage="curPage"
                v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                background
                :page-sizes="[20, 40, 60, 80]"
                :total="totalSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
    <TtTable 
        :columns="tableColumn"
        :data="tableData"
        height="500px"
        selectable
        selectType="checkbox"
        v-model:selectedKeys="selectedKeys"
        @selection-change="selectionChangeHandle"
    />
</template>


<script lang="ts" setup>
import TtTable from '@/components/widget/TtTable'

import tableApi from '@/api/table/index'
import { onMounted, reactive, ref } from 'vue'

/* 
  // 定义表格属性
  interface Column {
      label: string
      prop: string
      width?: string | number
      sortable?: boolean
      slot?: boolean
  }

  interface TableProps {
      columns: Column[]
      data: any[]
      emptyText?: string
      rowClassName?: string | Function
      stripe?: boolean
      rowHeight?: number      // 行高
      bufferSize?: number     // 缓冲区大小
      virtualScroll?: boolean // 是否开启虚拟滚动
  }

*/
interface Column {
    id: number
    code: number
    date: string
    name: string
    province: string
}
const tableColumn = [
    {
        prop: 'code',
        label: '代码',
        width: '180px',
    },
    {
        prop: 'date',
        label: '日期',
        width: '180px',
    },
    {
        prop: 'name',
        label: '名字',
        width: '1000px',
    },
    {
        prop: 'province',
        label: '地址',
        width: '1000px',
    },
]
let tableData = ref([])
let curPage = ref<number>(1)
let pageSize = ref<number>(5)
let totalSize = ref<number>(0)
let wrapper = ref()
let tableHeight = ref()
let selectData = ref<Column[]>([])

const selectedKeys = ref<(string | number)[]>([])

const selectionChangeHandle = (keys: (string | number)[]) => {
    console.log('Selected keys:', keys)
}

const getTableList = async () => {
    const res = await tableApi.getTableList({
        pageIndex: curPage.value,
        pageSize: pageSize.value,
    })
    const { data, total, totalPages } = res
    console.log(res, 'res')
    tableData.value = data
    totalSize.value = total
}

const getTableHeight = () => {
    const _wHeight = wrapper.value.clientHeight
    tableHeight.value = _wHeight - 100
}

onMounted(() => {
    getTableList()
    getTableHeight()
})

const handleSizeChange = (val: number) => {
    pageSize.value = val
    curPage.value = 1
    getTableList()
}
const handleCurrentChange = (val: number) => {
    curPage.value = val
    getTableList()
}
const handleSelectionChange = (val: Column[]) => {
    console.log(val, 'val')
    selectData.value = val
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    // margin-left: 20px;
    border: 1px solid #eee;
    box-sizing: border-box;
    .table-wrapper {
        & ::v-deep .el-scrollbar__view {
            display: block !important;
        }
    }
    .page-wrapper {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
}
</style>
