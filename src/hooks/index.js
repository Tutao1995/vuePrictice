import Mock from 'mockjs';

//延时200-600毫秒请求到数据
Mock.setup({
    timeout: '200-600'
});

// mock 一组角色数据；
const genRoles = () => ({
    status: 0,
    data: ['super', 'admin', 'nomal'],
    message: '成功'
});
// 项目看板数据
const getProjectInfo = {
    status: 0,
    message: '成功',
    data: [
        {
            projectId: '1',
            projectName: '后台管理系统',
            principal: '张三',
            timeConsuming: '20小时',
            status: '开发中',
            taskList: [
                {
                    taskId: 1,
                    taskName: '导航栏开发',
                    developTime: '3工时',
                    developMember: '李四',
                    taskStatus: 'preparation' // preparation: 准备阶段，development : 开发中， completed: 开发完成， test：测试阶段，released： 待发布
                },
                {
                    taskId: 2,
                    taskName: '内容页开发',
                    developTime: '8工时',
                    developMember: '王五',
                    taskStatus: 'development'
                },
                {
                    taskId: 3,
                    taskName: '侧边栏开发',
                    developTime: '9工时',
                    developMember: '赵六',
                    taskStatus: 'completed'
                },
                {
                    taskId: 4,
                    taskName: '侧边栏开发',
                    developTime: '9工时',
                    developMember: '赵六',
                    taskStatus: 'completed'
                },
                {
                    taskId: 5,
                    taskName: '侧边栏开发',
                    developTime: '9工时',
                    developMember: '赵六',
                    taskStatus: 'test'
                },
                {
                    taskId: 6,
                    taskName: '侧边栏开发',
                    developTime: '9工时',
                    developMember: '赵六',
                    taskStatus: 'released'
                }
            ]
        },
        {
            projectId: '2',
            projectName: '学生管理系统',
            principal: '老王',
            timeConsuming: '27小时',
            status: '开发中',
            taskList: [
                {
                    taskId: 7,
                    taskName: '导航栏开发',
                    developTime: '10工时',
                    developMember: '李四',
                    taskStatus: 'preparation' // preparation: 准备阶段，development : 开发中， completed: 开发完成， test：测试阶段，released： 待发布
                },
                {
                    taskId: 8,
                    taskName: '内容页开发',
                    developTime: '8工时',
                    developMember: '王五',
                    taskStatus: 'development'
                },
                {
                    taskId: 9,
                    taskName: '侧边栏开发',
                    developTime: '9工时',
                    developMember: '赵六',
                    taskStatus: 'completed'
                },
                {
                    taskId: 10,
                    taskName: '侧边栏开发',
                    developTime: '9工时',
                    developMember: '赵六',
                    taskStatus: 'test'
                }
            ]
        },
        {
            projectId: '3',
            projectName: '成绩管理系统',
            principal: '王五',
            timeConsuming: '40小时',
            status: '开发中',
            taskList: [
                {
                    taskId: 11,
                    taskName: '导航栏开发',
                    developTime: '13工时',
                    developMember: '李四',
                    taskStatus: 'preparation' // preparation: 准备阶段，development : 开发中， completed: 开发完成， test：测试阶段，released： 待发布
                },
                {
                    taskId: 12,
                    taskName: '内容页开发',
                    developTime: '18工时',
                    developMember: '王五',
                    taskStatus: 'development'
                },
                {
                    taskId: 13,
                    taskName: '侧边栏开发',
                    developTime: '9工时',
                    developMember: '赵六',
                    taskStatus: 'completed'
                }
            ]
        }
    ]
};
Mock.mock('/api/auth/roles', 'get', genRoles);
Mock.mock(RegExp('/api/project/list' + '.*'), 'get', getProjectInfo);
