export const option1 = {
    fpsLimit: 60,
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onClick: {
                // 开启鼠标点击的效果
                enable: true,
                mode: 'push',
            },
            onHover: {
                // 开启鼠标悬浮的效果(线条跟着鼠标移动)
                enable: true,
                mode: 'grab',
            },
            resize: true,
        },
        modes: {
            // 配置动画效果
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
            },
            push: {
                quantity: 4,
            },
            grab: {
                distance: 200,
                duration: 0.4,
            },
            attract: {
                // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
                distance: 200,
                duration: 0.4,
                factor: 5,
            },
        },
    },
    particles: {
        color: {
            value: '#6AECFF', // 粒子点的颜色
        },
        links: {
            color: '#6AECFF', // 线条颜色
            distance: 150,
            enable: true,
            opacity: 0.5, // 不透明度
            width: 2, // 线条宽度
        },
        collisions: {
            enable: true,
        },
        move: {
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
            bounce: false,
            direction: 'none',
            enable: true,
            out_mode: 'out',
            random: false,
            speed: 1, // 移动速度
            straight: false,
        },
        number: {
            density: {
                enable: true,
                value_area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'circle',
        },
        size: {
            random: true,
            value: 5,
        },
    },
    detectRetina: true,
}

export const option2 = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                valueArea: 400,
            },
        },
        color: {
            value: '#3CB2BE',
        },
        shape: {
            type: 'square',
            stroke: {
                width: 0,
                color: '#000000',
            },
            polygon: {
                nbSides: 15,
            },
        },
        opacity: {
            value: 1,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacityMin: 0.1,
                sync: false,
            },
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                sizeMin: 0.1,
                sync: false,
            },
        },
        lineLinked: {
            enable: true,
            distance: 160,
            color: '#3CB2BE',
            opacity: 0.5,
            width: 1,
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: true,
            straight: false,
            outMode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onHover: {
                enable: true,
                mode: 'grab',
            },
            onClick: {
                enable: false,
                mode: 'push',
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                lineLinked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 8,
                duration: 10,
                opacity: 0.248,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particlesNb: 4,
            },
            remove: {
                particlesNb: 2,
            },
        },
    },
    detectRetina: true,
}

export const option3 = {
    fpsLimit: 50,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push',
            },
            onHover: {
                enable: true,
                mode: 'grab',
            },
            resize: true,
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.6,
                size: 10,
            },
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: '#3CB2BE',
        },
        links: {
            color: '#3CB2BE',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 2,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                value_area: 800,
            },
            value: 60,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'circle',
        },
        size: {
            random: true,
            value: 5,
        },
    },
    detectRetina: true,
}
