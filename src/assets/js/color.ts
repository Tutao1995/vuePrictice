
export interface listItemType {
    text: string,
    bgColor: string,
    pinyin: string
}


export interface colorItemType {
    text: string,
    bgColor: string,
    list: listItemType[] | []
}



export default [

    {
        text: '红',
        bgColor: '#FFB3A7',
        list: [
            {
                text: '精白',
                pinyin: 'jīng bái',
                bgColor: '#FFF',
            },
            {
                text: '象牙白',
                pinyin: 'xiàng yá bái',
                bgColor: '#FFFBF0',
            },
            {
                text: '雪白',
                pinyin: 'xuě Bái',
                bgColor: '#F2FDFF',
            },
        ]
    },
    {

        text: '黄',
        bgColor: '#FFF143',
        list: [

        ]
    },
    {

        text: '绿',
        bgColor: '#BDDD22',
        list: [

        ]
    },
    {

        text: '蓝',
        bgColor: '#44CEF6',
        list: [

        ]
    },
    {

        text: '苍',
        bgColor: '#75878A',
        list: [

        ]
    },
    {

        text: '水',
        bgColor: '#88ADA6',
        list: [

        ]
    },
    {
        text: '白',
        bgColor: '#F2FDFF',
        list: [
            {
                text: '精白',
                pinyin: 'jīng bái',
                bgColor: '#FFF',
            },
            {
                text: '象牙白',
                pinyin: 'xiàng yá bái',
                bgColor: '#FFFBF0',
            },
            {
                text: '雪白',
                pinyin: 'xuě Bái',
                bgColor: '#F2FDFF',
            },
        ],
    },
    {

        text: '黑',
        bgColor: '#111',
        list: [

        ]
    },
    {

        text: '金',
        bgColor: '#F2BE45',
        list: [
        ]
    },
]

