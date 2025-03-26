<template>
    <div :class="wrapperClass">
        <!-- 左侧固定列 -->
        <div v-if="hasFixedLeft && fixedLeftColumns.length > 0" class="tt-table__fixed-left">
            <div class="tt-table__header-wrapper">
                <table class="tt-table__inner" :style="{ width: fixedLeftWidth + 'px' }">
                    <colgroup>
                        <col v-if="selectable" style="width: 50px">
                        <col v-for="column in fixedLeftColumns" 
                             :key="column.prop" 
                             :style="getColStyle(column)">
                    </colgroup>
                    <thead class="tt-table__header">
                        <tr>
                            <th v-if="selectable" class="tt-table__selection-cell">
                                <template v-if="selectType === 'checkbox'">
                                    <TtCheckbox
                                        :model-value="isAllSelected"
                                        :indeterminate="isIndeterminate"
                                        @update:model-value="handleSelectAll"
                                    />
                                </template>
                            </th>
                            <th v-for="column in fixedLeftColumns" 
                                :key="column.prop" 
                                :class="getHeaderCellClass(column)"
                                @contextmenu.prevent="showColumnMenu($event, column)">
                                <div class="tt-table__header-cell-content">
                                    {{ column.label }}
                                    <span v-if="column.sortable" class="tt-table__sort-icon">
                                        {{ getSortIcon(column) }}
                                    </span>
                                    <span class="tt-table__column-menu-trigger" @click="showColumnMenu($event, column)">⋮</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="tt-table__fixed-body-wrapper" 
                 :style="fixedBodyStyle"
                 @scroll="handleScroll">
                <table class="tt-table__inner" :style="{ width: fixedLeftWidth + 'px' }">
                    <colgroup>
                        <col v-if="selectable" style="width: 50px">
                        <col v-for="column in fixedLeftColumns" 
                             :key="column.prop" 
                             :style="getColStyle(column)">
                    </colgroup>
                    <tbody>
                        <tr v-for="(row, index) in visibleData" 
                            :key="row.id || index"
                            :class="getRowClass(row, startIndex + index)"
                            :style="{ height: rowHeight + 'px' }"
                            @click="handleRowClick(row, index)">
                            <td v-if="selectable" class="tt-table__selection-cell">
                                <template v-if="selectType === 'checkbox'">
                                    <TtCheckbox
                                        :model-value="isSelected(row)"
                                        @update:model-value="handleSelect(row)"
                                    />
                                </template>
                                <template v-else>
                                    <TtRadio
                                        :model-value="isSelected(row)"
                                        @update:model-value="handleSelect(row)"
                                        :name="String(row.id || row.key)"
                                    />
                                </template>
                            </td>
                            <td v-for="column in fixedLeftColumns" 
                                :key="column.prop"
                                :class="getCellClass(column)">
                                {{ row[column.prop] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 表头容器 -->
        <div class="tt-table__header-wrapper tt-table__header-not-fixed-wrapper" :style="headerWrapperStyle">
            <table class="tt-table__inner" :style="{ width: `${totalWidth}px` }">
                <colgroup>
                    <col v-if="selectable" style="width: 50px">
                    <col v-for="column in nonFixedColumns" 
                         :key="column.prop" 
                         :style="getColStyle(column)">
                </colgroup>
                <thead class="tt-table__header">
                    <tr>
                        <th v-if="selectable" class="tt-table__selection-cell">
                            <template v-if="selectType === 'checkbox'">
                                <TtCheckbox
                                    :model-value="isAllSelected"
                                    :indeterminate="isIndeterminate"
                                    @update:model-value="handleSelectAll"
                                />
                            </template>
                        </th>
                        <th v-for="column in nonFixedColumns" 
                            :key="column.prop" 
                            :class="getHeaderCellClass(column)"
                            @contextmenu.prevent="showColumnMenu($event, column)">
                            <div class="tt-table__header-cell-content">
                                {{ column.label }}
                                <span v-if="column.sortable" class="tt-table__sort-icon">
                                    {{ getSortIcon(column) }}
                                </span>
                                <span class="tt-table__column-menu-trigger" @click="showColumnMenu($event, column)">⋮</span>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        
        <!-- 添加列操作下拉菜单 -->
        <div v-if="showMenu" 
             class="tt-table__column-menu"
             :style="menuStyle"
             v-click-outside="hideColumnMenu">
            <div class="tt-table__column-menu-item" @click="handleFixColumn">
                {{ isColumnFixed(currentColumn) ? '取消固定' : '固定列' }}
            </div>
        </div>
        
        <!-- 内容区域 -->
        <div :class="[
                'tt-table__container',
                { 'tt-table__container--fixed-height': !!props.height }
             ]" 
             ref="tableContainer" 
             @scroll="handleScroll"
             :style="containerStyle">
            <table class="tt-table__inner" :style="{ width: `${totalWidth}px` }">
                <colgroup>
                    <col v-if="selectable" style="width: 50px">
                    <col v-for="column in nonFixedColumns" 
                         :key="column.prop" 
                         :style="getColStyle(column)">
                </colgroup>
                <tbody class="tt-table__body">
                    <tr v-for="(row, index) in visibleData" 
                        :key="row.id || index" 
                        :class="[
                            getRowClass(row, startIndex + index),
                            { 'tt-table__row--selected': isSelected(row) }
                        ]"
                        :style="{ height: rowHeight + 'px' }"
                        @click="(event) => handleRowClick(row, index, event)">
                        <td v-if="selectable" class="tt-table__selection-cell">
                            <template v-if="selectType === 'checkbox'">
                                <TtCheckbox
                                    :model-value="isSelected(row)"
                                    @update:model-value="handleSelect(row)"
                                />
                            </template>
                            <template v-else>
                                <TtRadio
                                    :model-value="isSelected(row)"
                                    @update:model-value="handleSelect(row)"
                                    :name="String(row.id || row.key)"
                                />
                            </template>
                        </td>
                        <td v-for="column in nonFixedColumns" 
                            :key="column.prop"
                            :class="getCellClass(column)">
                            <template v-if="column.slot">
                                <slot :name="column.prop" :row="row" :index="startIndex + index">
                                    {{ row[column.prop] }}
                                </slot>
                            </template>
                            <template v-else>
                                {{ row[column.prop] }}
                            </template>
                        </td>
                    </tr>
                    <!-- 空数据展示 -->
                    <tr v-if="!tableData.length">
                        <td :colspan="columns.length" class="tt-table__empty">
                            {{ emptyText }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import TtCheckbox from '@/components/widget/TtCheckbox/index'
import TtRadio from '@/components/widget/TtRadio/index'
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import { createNamespace } from '../../utils/index'

const { n } = createNamespace('table')

// 定义表格属性
interface Column {
    label: string
    prop: string
    width?: string | number
    sortable?: boolean
    slot?: boolean
    fixed?: 'left' | 'right' | false  // 新增 fixed 属性
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
    height?: string | number // 新增：表格高度
    selectable?: boolean     // 是否可选择
    selectType?: 'checkbox' | 'radio'  // 选择类型
    selectedKeys?: (string | number)[] // 选中的行的 key 数组
}

const props = withDefaults(defineProps<TableProps>(), {
    columns: () => [],
    data: () => [],
    emptyText: '暂无数据',
    stripe: false,
    rowHeight: 48,         // 默认行高
    bufferSize: 5,         // 默认缓冲区大小
    virtualScroll: false,  // 默认不开启虚拟滚动
    height: '',            // 默认为空，表示自动计算
    selectable: false,
    selectType: 'checkbox',
    selectedKeys: () => []
})

// 定义事件
const emit = defineEmits([
    'row-click', 
    'sort-change',
    'selection-change',    // 选择变化事件
    'update:selectedKeys',  // 支持 v-model:selectedKeys
    'update:columns'       // 添加更新列配置的事件
])

// 排序相关
const sortState = ref<{ prop: string, order: 'asc' | 'desc' | null }>({
    prop: '',
    order: null
})

// 虚拟滚动相关的状态
const tableContainer = ref<HTMLElement | null>(null)
const startIndex = ref(0)
const endIndex = ref(0)
const visibleCount = ref(0)
const offsetTop = ref(0)
const offsetBottom = ref(0)

// 添加新的状态
const columnStartIndex = ref(0)
const visibleColumnCount = ref(0)
const columnBufferSize = 3 // 列缓冲区大小

// 添加固定列相关的计算属性
const fixedLeftColumns = computed(() => {
    if (fixColumnIndex.value === -1) return []
    return props.columns.slice(0, fixColumnIndex.value + 1)
})

const hasFixedLeft = computed(() => {
    return fixedLeftColumns.value.length > 0
})

const fixedLeftWidth = computed(() => {
    let width = 0
    if (props.selectable) {
        width += 50 // 选择列宽度
    }
    fixedLeftColumns.value.forEach(col => {
        let colWidth = 0
        if (typeof col.width === 'string') {
            colWidth = parseInt(col.width.replace(/[^\d]/g, ''))
        } else if (typeof col.width === 'number') {
            colWidth = col.width
        }
        width += colWidth
    })
    return width
})

// 添加表格尺寸相关的响应式变量
const headerHeight = ref(48)
const bodyHeight = ref(0)

// 计算属性
const tableData = computed(() => {
    if (!sortState.value.prop || !sortState.value.order) return props.data

    return [...props.data].sort((a, b) => {
        const prop = sortState.value.prop
        const order = sortState.value.order
        if (order === 'asc') {
            return a[prop] > b[prop] ? 1 : -1
        } else {
            return a[prop] < b[prop] ? 1 : -1
        }
    })
})

const wrapperClass = computed(() => {
    return [
        n(),
        {
            [`${n()}--striped`]: props.stripe
        }
    ]
})

// 计算可见数据
const visibleData = computed(() => {
    if (!props.virtualScroll) return tableData.value

    const start = Math.max(0, startIndex.value - props.bufferSize)
    const end = Math.min(tableData.value.length, endIndex.value + props.bufferSize)
    return tableData.value.slice(start, end)
})


// 修改 nonFixedColumns 计算属性
const nonFixedColumns = computed(() => {
    // 返回非固定列
    return props.columns
})

// 修改总宽度计算
const totalWidth = computed(() => {
    let width = 0
    
    // 计算非固定列的宽度
    nonFixedColumns.value.forEach(col => {
        let colWidth = 0
        if (typeof col.width === 'string') {
            colWidth = parseInt(col.width.replace(/[^\d]/g, ''))
        } else if (typeof col.width === 'number') {
            colWidth = col.width
        }
        width += colWidth
    })
    
    // 确保总宽度至少等于容器宽度减去固定列宽度
    const containerWidth = tableContainer.value?.clientWidth || 1000
    const minWidth = Math.max(containerWidth - fixedLeftWidth.value, 0)
    return Math.max(width, minWidth)
})


// 修改容器样式
const containerStyle = computed(() => {
    const style: Record<string, string> = {}
    
    if (props.height) {
        style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
        style.maxHeight = style.height // 添加最大高度限制
    } else {
        const headerHeight = 48
        const minHeight = 200
        const maxHeight = 600
        // 根据实际数据计算内容高度
        const contentHeight = props.data.length * props.rowHeight
        let totalHeight = Math.max(minHeight, Math.min(maxHeight, contentHeight + headerHeight))
        style.height = `${totalHeight}px`
        style.maxHeight = `${totalHeight}px`
    }
    
    return style
})

// 修改表头容器样式
const headerWrapperStyle = computed(() => ({
    // marginLeft: hasFixedLeft.value ? `${fixedLeftWidth.value}px` : '0'
}))

// 修改固定列容器样式
const fixedBodyStyle = computed(() => {
    const style: Record<string, string> = {
        top: `${headerHeight.value}px`,
        bottom: '0'
    }
    
    if (props.height) {
        style.height = `calc(100% - ${headerHeight.value}px)`
    }
    
    return style
})

// 初始化虚拟滚动
onMounted(() => {
    if (!props.virtualScroll) {
        nextTick(() => {
            if (tableContainer.value) {
                // 不需要在这里设置高度，由 style 绑定处理
                updateVisibleCount()
            }
        })
        return
    }

    nextTick(() => {
        if (!tableContainer.value) return
        updateVisibleCount()
    })
})

// 初始化时计算可见列数
onMounted(() => {
    if (!props.virtualScroll || props.columns.length <= 20) return

    nextTick(() => {
        if (!tableContainer.value) return
        
        const containerWidth = tableContainer.value.clientWidth
        let accWidth = 0
        let count = 0
        
        for (const column of props.columns) {
            const width = parseInt(column.width as string) || 100
            accWidth += width
            count++
            
            if (accWidth > containerWidth) break
        }
        
        visibleColumnCount.value = count
    })
})

// 添加这个钩子
onMounted(() => {
    nextTick(() => {
        if (tableContainer.value) {
            const width = totalWidth.value
            console.log('Mounting width:', width) // 调试用
            // tableContainer.value.style.width = `${width}px`
            const headerWrapper = document.querySelector('.tt-table__header-wrapper') as HTMLElement
            if (headerWrapper) {
                headerWrapper.style.width = `${width}px`
            }
        }
    })
})

// 添加 resize 监听
onMounted(() => {
    window.addEventListener('resize', handleResize)
})

// 清理 resize 监听
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

// resize 处理函数
const handleResize = () => {
    nextTick(() => {
        if (tableContainer.value) {
            const width = totalWidth.value
            const headerWrapper = document.querySelector('.tt-table__header-wrapper') as HTMLElement
            if (headerWrapper) {
                headerWrapper.style.width = `${width}px`
            }
            updateVisibleCount()
        }
    })
}

// 修改滚动处理函数
const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement
    const { scrollTop, scrollLeft } = target
    
    // 判断滚动来源
    const isFromFixed = target.classList.contains('tt-table__fixed-body-wrapper')
    const isFromMain = target.classList.contains('tt-table__container')
    
    // 同步竖向滚动
    if (isFromFixed) {
        // 如果是固定列滚动，同步主表格
        if (tableContainer.value) {
            tableContainer.value.scrollTop = scrollTop
        }
    } else if (isFromMain) {
        // 如果是主表格滚动，同步固定列
        const fixedBodyWrapper = document.querySelector('.tt-table__fixed-body-wrapper') as HTMLElement
        if (fixedBodyWrapper) {
            fixedBodyWrapper.scrollTop = scrollTop
        }
    }
    
    // 更新表头位置
    const headerWrapper = document.querySelector('.tt-table__header-not-fixed-wrapper table') as HTMLElement
    if (headerWrapper) {
        console.log('scrollLeft:', scrollLeft)
        headerWrapper.style.transform = `translateX(-${scrollLeft}px)`
    }
}

// 方法
const handleSort = (column: Column) => {
    if (!column.sortable) return

    const { prop } = column
    let order: 'asc' | 'desc' | null = null

    if (sortState.value.prop === prop) {
        if (sortState.value.order === 'asc') {
            order = 'desc'
        } else if (sortState.value.order === 'desc') {
            order = null
        } else {
            order = 'asc'
        }
    } else {
        order = 'asc'
    }

    sortState.value = { prop, order }
    emit('sort-change', { prop, order })
}

const handleRowClick = (row: any, index: number, event: MouseEvent) => {
    // 如果点击的是复选框或单选框所在的单元格，不触发行选中
    if ((event.target as HTMLElement).closest('.tt-table__selection-cell')) {
        return
    }
    
    // 只有在可选择模式下才触发选择
    if (props.selectable) {
        handleSelect(row)
    }
    
    // 触发行点击事件
    emit('row-click', row, index)
}

const getHeaderCellClass = (column: Column) => {
    return [
        `${n()}__header-cell`,
        {
            [`${n()}__header-cell--sortable`]: column.sortable,
            [`${n()}__header-cell--fixed-left`]: column.fixed === 'left'
        }
    ]
}

const getCellClass = (column: Column) => {
    return [
        `${n()}__cell`,
        {
            [`${n()}__cell--${column.prop}`]: column.prop,
            [`${n()}__cell--fixed-left`]: column.fixed === 'left'
        }
    ]
}

const getRowClass = (row: any, index: number) => {
    const classes = [`${n()}__row`]
    
    if (props.stripe && index % 2 === 1) {
        classes.push(`${n()}__row--striped`)
    }
    
    if (props.rowClassName) {
        if (typeof props.rowClassName === 'function') {
            classes.push(props.rowClassName(row, index))
        } else {
            classes.push(props.rowClassName)
        }
    }
    
    return classes
}

const getSortIcon = (column: Column) => {
    if (!column.sortable) return ''
    if (sortState.value.prop !== column.prop) return '↕'
    return sortState.value.order === 'asc' ? '↑' : '↓'
}

// 添加更新可见行数的方法
const updateVisibleCount = () => {
    if (!tableContainer.value) return
    
    const containerHeight = tableContainer.value.clientHeight
    // 计算可见行数时考虑缓冲区
    visibleCount.value = Math.ceil(containerHeight / props.rowHeight) + (props.bufferSize * 2)
    
    // 更新结束索引，确保不超过数据总量
    endIndex.value = Math.min(
        startIndex.value + visibleCount.value,
        tableData.value.length
    )
    
    // 更新偏移量
    offsetTop.value = startIndex.value * props.rowHeight
    offsetBottom.value = (tableData.value.length - endIndex.value) * props.rowHeight
}

// 添加选择相关的状态和方法
const isAllSelected = computed(() => {
    if (!props.selectable || props.selectType !== 'checkbox' || !tableData.value.length) {
        return false
    }
    return tableData.value.every(row => isSelected(row))
})

const isIndeterminate = computed(() => {
    if (!props.selectable || props.selectType !== 'checkbox' || !tableData.value.length) {
        return false
    }
    return tableData.value.some(row => isSelected(row)) && !isAllSelected.value
})

const isSelected = (row: any) => {
    const rowKey = row.id || row.key
    return props.selectedKeys.includes(rowKey)
}

const handleSelect = (row: any) => {
    if (!props.selectable) return
    
    const rowKey = row.id || row.key
    let newSelectedKeys: (string | number)[] = []
    
    if (props.selectType === 'radio') {
        newSelectedKeys = [rowKey]
    } else {
        newSelectedKeys = isSelected(row)
            ? props.selectedKeys.filter(key => key !== rowKey)
            : [...props.selectedKeys, rowKey]
    }
    
    emit('update:selectedKeys', newSelectedKeys)
    emit('selection-change', newSelectedKeys)
}

const handleSelectAll = (checked: boolean) => {
    if (!props.selectable || props.selectType !== 'checkbox') return
    
    const newSelectedKeys = checked
        ? tableData.value.map(row => row.id || row.key)
        : []
    
    emit('update:selectedKeys', newSelectedKeys)
    emit('selection-change', newSelectedKeys)
}

// 修改 getColStyle 方法
const getColStyle = (column: Column) => {
    const width = typeof column.width === 'number' 
        ? `${column.width}px` 
        : column.width
    return { width }
}

// 在 mounted 时计算表格尺寸
onMounted(() => {
    nextTick(() => {
        if (tableContainer.value) {
            // 获取表头高度
            const headerEl = tableContainer.value.querySelector('.tt-table__header-wrapper')
            if (headerEl) {
                headerHeight.value = headerEl.getBoundingClientRect().height
            }
            
            // 计算内容区域高度
            if (props.height) {
                const totalHeight = typeof props.height === 'number' 
                    ? props.height 
                    : parseInt(props.height)
                bodyHeight.value = totalHeight - headerHeight.value
            } else {
                bodyHeight.value = tableContainer.value.getBoundingClientRect().height - headerHeight.value
            }
        }
    })
})

// 添加菜单相关的状态
const showMenu = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const currentColumn = ref<Column | null>(null)

// 菜单样式计算属性
const menuStyle = computed(() => ({
    left: menuPosition.value.x + 'px',
    top: menuPosition.value.y + 'px'
}))

// 显示列菜单
const showColumnMenu = (event: MouseEvent, column: Column) => {
    event.stopPropagation()
    showMenu.value = true
    menuPosition.value = {
        x: event.clientX,
        y: event.clientY
    }
    currentColumn.value = column
}

// 隐藏列菜单
const hideColumnMenu = () => {
    showMenu.value = false
    currentColumn.value = null
}

const fixColumnIndex = ref(-1)

// 添加判断列是否固定的方法
const isColumnFixed = (column: Column | null) => {
    if (!column) return false
    const columnIndex = props.columns.findIndex(col => col.prop === column.prop)
    return columnIndex <= fixColumnIndex.value
}

// 修改固定列处理方法
const handleFixColumn = () => {
    if (!currentColumn.value) return
    const columnIndex = props.columns.findIndex(col => col.prop === currentColumn.value?.prop)
    if (columnIndex === -1) return

    if (isColumnFixed(currentColumn.value)) {
        // 如果是取消固定，则将该列及其右侧所有固定列都取消固定
        fixColumnIndex.value = -1
    } else {
        // 如果是固定列，则将该列及其左侧所有列都固定
        fixColumnIndex.value = columnIndex
    }
    hideColumnMenu()
}

// 添加 v-click-outside 指令
const clickOutside = {
    mounted(el: HTMLElement, binding: any) {
        el._clickOutside = (event: Event) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event)
            }
        } 
        document.addEventListener('click', el._clickOutside)
    },
    unmounted(el: HTMLElement) {
        document.removeEventListener('click', el._clickOutside)
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';

$N: 'tt-table';

.#{$N} {
    position: relative;
    width: 100%;
    // height: 100%;  // 确保外层容器占满高度
    box-sizing: border-box;
    font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
    background: $bg-color;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__fixed-left {
      th {
        text-align: left;
      }
      td {
        text-align: left;
      }
    }
    &__header-wrapper {
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: #f5f7fa;
        border-bottom: 1px solid $border-color;
        overflow: hidden;
        width: fit-content;
        min-width: 100%;
        flex-shrink: 0; // 防止头部被压缩
        
        table {
            border-spacing: 0;
            border-collapse: separate;
            table-layout: fixed;
        }
    }
    &__fixed-body-wrapper {
      table {
          border-spacing: 0;
          border-collapse: separate;
          table-layout: fixed;
      }

    }
    &__container {
        position: relative;
        overflow: auto;
        width: 100%;
        flex: 1;
        
        &--fixed-height {
            flex: none;
        }
        
        table {
            border-spacing: 0;
            border-collapse: separate;
            table-layout: fixed;
        }

        // 修改滚动条样式
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            display: block;
        }

        &::-webkit-scrollbar-thumb {
            background: #c0c4cc;
            border-radius: 4px;
            &:hover {
                background: #a6a6a6;
            }
        }

        &::-webkit-scrollbar-track {
            background: #f5f7fa;
        }
    }

    &__inner {
        table-layout: fixed;
        width: 100%;
    }

    &__header {
        th {
            position: relative;
            padding: 12px 8px;
            font-weight: 500;
            color: #606266;
            text-align: left;
            background-color: #f5f7fa;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    &__body {
        width: 100%;
        
        td {
            position: relative;
            padding: 12px 8px;
            border-bottom: 1px solid $border-color;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            height: v-bind(rowHeight + 'px'); // 确保行高一致
        }
    }

    &__row {
        &:hover {
            background-color: #f5f7fa;
        }
        
        &--striped {
            background-color: #fafafa;
        }

        &--selected {
            background-color: #ecf5ff !important;
        }
    }

    &__empty {
        padding: 32px;
        text-align: center;
        color: #909399;
    }

    &__sort-icon {
        margin-left: 4px;
        color: #c0c4cc;
    }

    &__selection-cell {
        text-align: center !important;
        width: 50px;
        padding: 0 !important;
        vertical-align: middle;
        
        :deep(.tt-checkbox),
        :deep(.tt-radio) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }

    &__fixed-left {
        position: absolute;
        left: 0;
        top: 0;
        height: calc(100% - 8px);
        z-index: 3;
        background-color: $bg-color;
        border-right: 1px solid $border-color;
        box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);
        pointer-events: none; // 让固定列容器不阻挡事件
    }
    
    &__fixed-body-wrapper {
        position: absolute;
        left: 0;
        top: 48px; // 表头高度
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: $bg-color;
        width: 100%;
        pointer-events: auto; // 恢复固定列内容的事件
        
        .#{$N}__inner {
            background-color: $bg-color;
        }
        
        // 隐藏滚动条但保持功能
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
    
    // 修改固定列样式
    &__cell,
    &__header-cell {
        &--fixed-left {
            background-color: inherit;
        }
    }
    
    // 确保固定列的背景色正确
    &__header-cell--fixed-left {
        background-color: #f5f7fa !important;
    }
    
    &__cell--fixed-left {
        background-color: $bg-color !important;
    }

    &__header-cell-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-right: 8px; // 添加右侧padding，确保菜单触发器不会太靠右
    }

    &__column-menu-trigger {
        opacity: 0;
        cursor: pointer;
        padding: 0 4px;
        color: #909399;
        transition: opacity 0.2s;
        margin-left: auto; // 确保触发器靠右对齐

        &:hover {
            color: #409eff;
        }
    }

    &__header-cell:hover,
    &__header-cell--fixed-left:hover {
        .#{$N}__column-menu-trigger {
            opacity: 1;
        }
    }

    &__column-menu {
        position: fixed;
        z-index: 1000;
        min-width: 100px;
        padding: 4px 0;
        background-color: #fff;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    &__column-menu-item {
        padding: 8px 16px;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f5f7fa;
            color: #409eff;
        }
    }
}
</style>
