// 复制「收妹妹处兄妹」
global.setClip('收妹妹处兄妹')

// 关闭快手（防止不在快手主页）
shizuku.cmd(['shell', 'am', 'force-stop', 'com.smile.gifmaker'])

// 打开快手并等待
shizuku.cmd(['shell', 'monkey', '-p', 'com.smile.gifmaker', '-c', 'android.intent.category.LAUNCHER', '1'])
global.sleep(1000)

// 点击右上角搜索图标
点击('右上角搜索图标')

// 粘贴「收妹妹处兄妹」
shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_PASTE'])

// 复制「我想收一些妹妹，你能当我妹妹吗」
global.setClip('我想收一些妹妹，你能当我妹妹吗')

// **不断**
for (; ;) {
    // 点击右上角搜索按钮（再次点击即可起到刷新搜索结果的作用）
    点击('右上角搜索按钮')

    // 点击第一条作品（离开搜索结果页，进入作品页）
    点击('第一条作品')

    // 点击右侧评论区图标（离开作品页，进入评论区）
    点击('右侧评论区图标')

    // 点击评论条数标签
    点击('评论条数标签')

    // 点击按最新排序按钮
    点击('按最新排序按钮')

    // **不断**`翻评论区`
    for (; ;) {
        // 有则点击评论要哥哥的用户头像（离开评论区，进入用户主页）
        if (有则点击('评论要哥哥', '该评论的用户头像')) {
            // 若还没关注
            if (检查('还没关注')) {
                // 点击关注按钮
                点击('关注按钮')

                // 点击发私信按钮（离开用户主页，进入私信界面）
                点击('发私信按钮')

                // 点击底部消息输入框
                点击('底部消息输入框')

                // 粘贴「我想收一些妹妹，你能当我妹妹吗」
                shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_PASTE'])

                // 点击右下角发送图标
                点击('右下角发送图标')

                // 若看见「上限」，则关闭快手并退出程序（**整个流程结束**）
                if (看见('上限')) { shizuku.cmd(['shell', 'am', 'force-stop', 'com.smile.gifmaker']); global.exit() }

                // 按返回键（退出私信界面，回到用户主页）并等待
                shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
                global.sleep(1000)
            }

            // 按返回键（退出用户主页，回到评论区）并等待
            shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
            global.sleep(1000)
        }

        // 若翻到底了，则**打破**`翻评论区`，否则向下滚动并等待
        if (检查('翻到底了')) { break } else {
            shizuku.cmd(['shell', `input swipe ${device.width * 0.5} ${device.height * 0.6} ${device.width * 0.5} ${device.height * 0.4} 1000`]);
            global.sleep(1000)
        }
    }

    // 按返回键（退出评论区，回到作品页）并等待
    shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
    global.sleep(1000)

    // 按返回键（退出作品页，回到搜索结果页）并等待
    shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
    global.sleep(1000)
}

const AI = storage.create('AI')
const API_KEY = AI.get('API_KEY')
const BASE_URL = AI.get('BASE_URL')
const MODEL = AI.get('MODEL')

function 点击(which) {
    const path = files.path("截图.png")
    shizuku.cmd(['shell', 'screencap', '-p', path])
    let err
    for (let i = 0; i < 5; i++) {
        try {
            const response = http.postJson(`${BASE_URL}/chat/completions`, {
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个UI定位器。'
                    },
                    {
                        role: 'user',
                        content: {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/jpeg;base64,${images.toBase64(images.resize(images.read(path), [1000, 1000]), 'jpeg', 95)}`
                            }
                        }
                    },
                    {
                        role: 'user',
                        content: `请输出截图中${which}的坐标。`
                    }
                ],
                response_format: {
                    type: 'json_schema',
                    json_schema: {
                        name: 'point',
                        strict: true,
                        schema: {
                            type: 'array',
                            description: '坐标[x, y]',
                            items: {
                                type: 'number',
                                minimum: 0,
                                maximum: 1000,
                            },
                            minItems: 2,
                            maxItems: 2,
                        }
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            })
            const [x, y] = JSON.parse(response.body.json().choices[0].message.content)
            shizuku.cmd(['shell', 'input', 'tap', Math.floor(x * device.width / 1000), Math.floor(y * device.height / 1000)])
            global.sleep(1000)
            return
        } catch (e) {
            err = e
        }
    }
    throw err
}

function 有则点击(what, which) {
    const path = files.path("截图.png")
    shizuku.cmd(['shell', 'screencap', '-p', path])
    let err
    for (let i = 0; i < 5; i++) {
        try {
            const response = http.postJson(`${BASE_URL}/chat/completions`, {
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个UI定位器。'
                    },
                    {
                        role: 'user',
                        content: {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/jpeg;base64,${images.toBase64(images.resize(images.read(path), [1000, 1000]), 'jpeg', 95)}`
                            }
                        }
                    },
                    {
                        role: 'user',
                        content: `请判断截图中是否存在${what}，若存在则输出${which}的坐标，若不存在则输出null。`
                    }
                ],
                response_format: {
                    type: 'json_schema',
                    json_schema: {
                        name: 'point',
                        strict: true,
                        schema: {
                            anyOf: [
                                {
                                    type: 'array',
                                    description: '坐标[x, y]',
                                    items: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 1000,
                                    },
                                    minItems: 2,
                                    maxItems: 2,
                                },
                                {
                                    type: 'null',
                                    description: '不存在'
                                },
                            ],
                        }
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            })
            const point = JSON.parse(response.body.json().choices[0].message.content)
            if (!point) return false
            const [x, y] = point
            shizuku.cmd(['shell', 'input', 'tap', Math.floor(x * device.width / 1000), Math.floor(y * device.height / 1000)])
            global.sleep(1000)
            return true
        } catch (e) {
            err = e
        }
    }
    throw err
}

function 检查(what) {
    const path = files.path("截图.png")
    shizuku.cmd(['shell', 'screencap', '-p', path])
    let err
    for (let i = 0; i < 5; i++) {
        try {
            const response = http.postJson(`${BASE_URL}/chat/completions`, {
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个UI定位器。'
                    },
                    {
                        role: 'user',
                        content: {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/jpeg;base64,${images.toBase64(images.resize(images.read(path), [1000, 1000]), 'jpeg', 95)}`
                            }
                        }
                    },
                    {
                        role: 'user',
                        content: `请输出截图中是否${what}。`
                    }
                ],
                response_format: {
                    type: 'json_schema',
                    json_schema: {
                        name: 'bool',
                        strict: true,
                        schema: {
                            type: 'boolean',
                            description: '判断',
                        }
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            })
            return JSON.parse(response.body.json().choices[0].message.content)
        } catch (e) {
            err = e
        }
    }
    throw err
}

function 看见(text) {
    const path = files.path("截图.png")
    shizuku.cmd(['shell', 'screencap', '-p', path])
    const texts = ocr.recognizeText(path)
    for (let i = 0; i < texts.length; i++) {
        if (texts[i].indexOf(text) !== -1) return true
    }
    return false
}