<template>
    <div ref="showRef">x: {{ x }}, y: {{ y }}</div>
    <div class="box" ref="showRef">
        <div ref="countRef">{{ count }}</div>
    </div>
    <el-button @click="add" v-auth="['admin', 'common']">+</el-button>
    <el-button @click="cut" v-auth="['admin', 'common']">-</el-button>
    <el-button @click="openModal" v-auth="['common']">openModal</el-button>
    <el-button @click="dialogVisibleShow" v-auth="['admin', 'system']">dialogVisible</el-button>
    <el-button @click="openChatDialogHandler" v-auth="['system']">openChatDialog</el-button>
    <Modal v-model="modalVisible" @ok-handle="onOk" @cancel-handle="onCancel" />
    <ChatDialog :visible="visible" @close="closeDialogHandler">
        <p>我是谈拆给你</p>
    </ChatDialog>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <span>This is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <div>
        <TtInput placeholder="请输入" v-model="inputValue" :clearable="true" style="width: 200px">
            <template #suffix>
                <div>111</div>
            </template>
        </TtInput>
        <TtInput placeholder="请输入" v-model="inputValue" :clearable="true">
            <template #suffix>
                <div>22</div>
            </template>
        </TtInput>
        <TtSelect placeholder="请输入" v-model="inputValue" :options="selectOptions"></TtSelect>
        <TtCheckbox label="111" v-model="checkValue" :indeterminate="true" />
        <TtCheckbox label="111" v-model="checkValue" :indeterminate="true" />
        {{ checkboxGroupValue }}
        <!-- <TtCheckboxGroup v-model="checkboxGroupValue" :options="selectOptions" /> -->
        <TtRadio v-model="checkValue" label="111" :disabled="true" />
        <TtRadio v-model="checkValue2" label="222" />
        {{ radioValue }}
        <!-- <TtRadioGroup v-model="radioValue" :options="selectOptions" /> -->
        <TtButton text="test" />
        <TtButton text="tesdfdfdft" @click="ttDialogVisibleHandle" type="primary" />
        <TtButton text="test" type="success" />
        <TtButton text="test" type="warning" />
        <TtButton text="test" type="danger" />
        <TtButton text="test" type="info" />
        <TtButton text="x" type="info" shape="circle" />
        <TtButton text="x" :disabled="true" />
        {{ inputValue }}
        <TtToolTip content="trestdfdfdffdf" trigger="click">
            <span>test</span>
        </TtToolTip>
        <TtCalendar />
        <p class="text1">为你定制 发现精彩</p>
        <span style="width: 100px; display: inline-block">
            <el-select v-model="value" placeholder="Select" style="width: 240px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </span>
        <div class="loader"></div>
    </div>
    {{ testNumber }} {{ testNumberHandler(testNumber) }}
    <TtDialog
        v-model="ttDialogVisible"
        :title="'test'"
        :showClose="true"
        :showFooter="true"
        :showHeader="true"
        :showMask="true"
        :maskClosable="true"
        :modalClass="['test']"
        :modalStyle="{}"
    >
        <template #header> header </template>
        <template #content>
            <TtButton text="tesdfdfdft" @click="dialogTestHandle" type="primary" />
            <TtDialog
                v-model="dialogTest"
                :title="'test'"
                :showClose="true"
                :showFooter="true"
                :showHeader="true"
                :showMask="true"
                :maskClosable="true"
                :modalClass="['test']"
                :modalStyle="{}"
            >
                <template #header> header </template>
                <template #content> content </template>
                <template #footer> footer </template>
            </TtDialog>
        </template>
        <template #footer> footer </template>
    </TtDialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import useMouse from '@/hooks/useMouse'
import { useDraggable } from '@/hooks/useDraggable'
import Modal from '@/components/Modal.vue'
import ChatDialog from '@/components/Dialog.vue'
import TtToolTip from '@/components/widget/TtToolTip'
import TtInput from '@/components/widget/TtInput'
import TtSelect from '@/components/widget/TtSelect'
import TtButton from '@/components/widget/TtButton'
import TtCheckbox from '@/components/widget/TtCheckbox'
import TtRadio from '@/components/widget/TtRadio'
import { TtCheckboxGroup } from '@/components/widget/TtCheckbox'
import { TtRadioGroup } from '@/components/widget/TtRadio'
import TtDialog from '@/components/widget/TtDialog'
import TtCalendar from '@/components/widget/TtCalendar'

const dialogTest = ref(false)

const dialogTestHandle: () => void = () => {
    dialogTest.value = true
}

const ttDialogVisible = ref(false)

const ttDialogVisibleHandle = () => {
    ttDialogVisible.value = true
}

const inputValue = ref<string>('11')

const checkValue = ref(true)
const checkValue2 = ref(false)

const radioValue = ref('')

const value = ref('')
type Option = {
    label: string
    value: string | number
    disabled?: Boolean
}
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]

const selectOptionValue = [
    {
        value: 1,
        label: 'test1',
    },
    {
        value: 2,
        label: 'test1',
    },
    {
        value: 3,
        label: 'testddddddddddddddddddddddddddddddddddddddddddddddd1',
    },
    {
        value: 4,
        label: 'test1',
    },
    {
        value: 2,
        label: 'test2',
        disabled: true,
    },
] as Option[]

const selectOptions = ref(selectOptionValue) 

const checkboxGroupValue = ref([])

/**
 *
 * 自定义弹窗相关
 */
let modalVisible = ref<boolean>(false)
const openModal = () => {
    modalVisible.value = true
}
const onOk = () => {
    modalVisible.value = false
}
const onCancel = (value: boolean) => {
    console.log(value)
    modalVisible.value = value
}
/**
 *
 * elementPlus 弹窗
 */
let dialogVisible = ref<boolean>(false)
const dialogVisibleShow = () => {
    dialogVisible.value = true
}

/**
 *
 * 加减
 */
const count = ref<number>(0)
const add = () => {
    count.value++
}
const cut = () => {
    count.value--
}

/**
 * 鼠标移动
 */
const { x, y } = useMouse()

/**
 * 拖拽
 */
const showRef = ref<HTMLElement>()
const countRef = ref<HTMLElement>()
const draggableComputed = computed(() => true)
useDraggable(countRef, countRef, showRef, draggableComputed)

/* 
chatgpt 组件
*/
const visible = ref<boolean>(false)

const closeDialogHandler = () => {
    visible.value = false
}
const openChatDialogHandler = () => {
    visible.value = true
}

let testNumber = 12345678

/* 
    /B   非边界匹配     比如： hello   -》  h,e,l,l,o
    /b   边界匹配       比如： hell0   ->  ,hello,
    \d   数字
    {3}  匹配多少次
    +    一次或者多次
    ?=   前瞻
    ?!   非前瞻
    ()   匹配
*/
function testNumberHandler(testNumber: number) {
    return String(testNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',') //d{3}+/
}
</script>

<style lang="scss" scoped>
.box {
    width: 500px;
    height: 500px;
    border: 1px solid #eee;
}

.text1 {
    background-image: linear-gradient(#ffcf02, #ff7352);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px #333;
}

.text2 {
    -webkit-text-stroke: 2px #333;
}

.loader {
    --n: 120px;
    width: var(--n);
    height: var(--n);
    background: conic-gradient(from 45deg, #2196f3 25%, #f44336 0 50%, #4caf50 0 75%, #ffc107 0);
    -webkit-mask: radial-gradient(50% 50%, #000 96%, #0000) left/35% 35% no-repeat;
    animation: load 2s infinite;
}

@keyframes load {
    25% {
        -webkit-mask-position: top;
    }

    50% {
        -webkit-mask-position: right;
    }

    75% {
        -webkit-mask-position: bottom;
    }
}
</style>
