'ui'

const 能力 = {}

function _浮动(w) {
    let x = 0, y = 0, wx, wy
    w.拖动.setOnTouchListener((_, event) => {
        switch (event.getAction()) {
            case event.ACTION_DOWN: {
                x = event.getRawX()
                y = event.getRawY()
                wx = w.getX()
                wy = w.getY()
                break
            }
            case event.ACTION_MOVE: {
                w.setPosition(wx + event.getRawX() - x, wy + event.getRawY() - y)
                break
            }
        }
        return true
    })

    let flag = true, skipped = false

    w.下一步.click(() => {
        flag = false
    })

    w.跳出.click(() => {
        skipped = true
        flag = false
    })

    while (flag) {
        global.sleep(80)
    }

    w.close()

    if (skipped) {
        throw new Error('跳出')
    }
}

function _视觉(text, schema) {
    const path = files.path('截图.png')
    global.shizuku(['shell', 'screencap', '-p', path])
    const raw = images.read(path)
    if (!raw) {
        throw new Error('截图失败')
    }
    try {
        const resized = images.resize(raw, [1000, 1000])
        try {
            let err
            for (let i = 0; i < 5; i++) {
                try {
                    const response = http.postJson(`${BASE_URL}/chat/completions`, {
                        model: MODEL,
                        messages: [
                            {
                                role: 'user',
                                content: [
                                    {
                                        type: 'image_url',
                                        image_url: {
                                            url: `data:image/jpeg;base64,${images.toBase64(resized, 'jpeg', 95)}`
                                        }
                                    },
                                    {
                                        type: 'text',
                                        text
                                    }
                                ]
                            }
                        ],
                        response_format: {
                            type: 'json_schema',
                            json_schema: {
                                name: '结果',
                                strict: true,
                                schema: {
                                    type: 'object',
                                    properties: {
                                        结果: schema
                                    },
                                    required: ['结果']
                                }
                            }
                        }
                    }, {
                        headers: {
                            'Authorization': `Bearer ${API_KEY}`
                        }
                    })
                    return JSON.parse(response.body.json().choices[0].message.content).结果
                } catch (e) {
                    err = e
                }
            }
            throw err
        } finally {
            resized.recycle()
        }
    } finally {
        raw.recycle()
    }
}

function _自动操作(w, 动作) {
    w.自动操作.click(() => {
        w.自动操作.enabled = false
        threads.start(() => {
            try {
                动作()
            } catch (e) {
                toastLog(e.message)
            }
            ui.run(() => {
                w.自动操作.enabled = true
            })
        })
    })

    _浮动(w)
}

能力.完成 = (手动) => {
    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <button id="下一步" text="完成" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        _浮动(w)
    }

    throw new Error('完成')
}

能力.安装注册登录 = (应用名) => {
    const w = floaty.window(
        <vertical>
            <text id="拖动">✥</text>
            <text>{`请您：安装、注册、登录「${应用名}」。`}</text>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </vertical>
    )

    _浮动(w)
}

能力.进入主页 = (手动, 应用名, 包名) => {
    const 操作 = () => {
        global.shizuku(['shell', 'am', 'force-stop', 包名])
        global.shizuku(['shell', 'monkey', '-p', 包名, '-c', 'android.intent.category.LAUNCHER', '1'])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：进入「${应用名}」主页。`}</text>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        _自动操作(w, () => {
            操作()
        })
    } else {
        操作()
    }
}

能力.回到上一页 = (手动, 页名) => {
    const 操作 = () => {
        global.shizuku(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：返回「${页名}」。`}</text>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        _自动操作(w, () => {
            操作()
        })
    } else {
        操作()
    }
}

能力.向下滚动 = (手动) => {
    const 操作 = () => {
        global.shizuku(['shell', 'input', 'swipe', device.width * 0.5, device.height * 0.6, device.width * 0.5, device.height * 0.4, 1000])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：向下滚动。`}</text>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        _自动操作(w, () => {
            操作()
        })
    } else {
        操作()
    }
}

能力.检查 = (手动, 内容) => {
    const 操作 = () => {
        return _视觉(`请问：是否「${内容}」？`, { type: 'boolean' })
    }

    let 结果
    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请问：是否「${内容}」？`}</text>
                <horizontal>
                    <button id="是" text="是" />
                    <button id="否" text="否" />
                </horizontal>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        w.是.click(() => {
            结果 = true
            w.是.enabled = false
            w.否.enabled = true
            w.下一步.enabled = true
        })
        w.否.click(() => {
            结果 = false
            w.否.enabled = false
            w.是.enabled = true
            w.下一步.enabled = true
        })
        ui.run(() => {
            w.下一步.enabled = false
        })

        _自动操作(w, () => {
            结果 = 操作()
            ui.run(() => {
                if (结果) {
                    w.是.enabled = false
                    w.否.enabled = true
                } else {
                    w.否.enabled = false
                    w.是.enabled = true
                }
                w.下一步.enabled = true
            })
        })
    } else {
        结果 = 操作()
    }

    return 结果
}

能力.点击 = (手动, 元素) => {
    const 操作 = () => {
        const [x, y] = _视觉(`请问：「${元素}」坐标？`, {
            type: 'array',
            description: '[x, y]',
            items: {
                type: 'number',
                minimum: 0,
                maximum: 1000,
            },
            minItems: 2,
            maxItems: 2,
        })
        global.shizuku(['shell', 'input', 'tap', Math.floor(x * device.width / 1000), Math.floor(y * device.height / 1000)])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：点击「${元素}」。`}</text>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        _自动操作(w, () => {
            操作()
        })
    } else {
        操作()
    }
}

能力.检查若是则先点击 = (手动, 内容, 元素) => {
    const 操作 = () => {
        const 返回 = _视觉(`请问：是否「${内容}」？若是，请问：「${元素}」坐标？若否，请输出null。`, {
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
                    description: '否'
                },
            ],
        })
        if (!返回) return false
        const [x, y] = 返回
        global.shizuku(['shell', 'input', 'tap', Math.floor(x * device.width / 1000), Math.floor(y * device.height / 1000)])
        global.sleep(800)
        return true
    }

    let 结果
    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请问：是否「${内容}」？若是，则请您先：点击「${元素}」`}</text>
                <horizontal>
                    <button id="是" text="是" />
                    <button id="否" text="否" />
                </horizontal>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        w.是.click(() => {
            结果 = true
            w.是.enabled = false
            w.否.enabled = true
            w.下一步.enabled = true
        })
        w.否.click(() => {
            结果 = false
            w.否.enabled = false
            w.是.enabled = true
            w.下一步.enabled = true
        })
        ui.run(() => {
            w.下一步.enabled = false
        })

        _自动操作(w, () => {
            结果 = 操作()
            ui.run(() => {
                if (结果) {
                    w.是.enabled = false
                    w.否.enabled = true
                } else {
                    w.否.enabled = false
                    w.是.enabled = true
                }
                w.下一步.enabled = true
            })
        })
    } else {
        结果 = 操作()
    }

    return 结果
}

能力.点击之后看见 = (手动, 元素, 文本) => {
    const 操作 = () => {
        const [x, y] = _视觉(`请问：「${元素}」坐标？`, {
            type: 'array',
            description: '[x, y]',
            items: {
                type: 'number',
                minimum: 0,
                maximum: 1000,
            },
            minItems: 2,
            maxItems: 2,
        })

        global.shizuku(['shell', 'input', 'tap', Math.floor(x * device.width / 1000), Math.floor(y * device.height / 1000)])
        global.sleep(800)

        const path = files.path('截图.png')
        global.shizuku(['shell', 'screencap', '-p', path])
        const texts = ocr.recognizeText(path)
        for (let i = 0; i < texts.length; i++) {
            if (texts[i].indexOf(文本) !== -1) {
                return true
            }
        }
        return false
    }

    let 结果
    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：点击「${元素}」。然后立刻判断：是否看见「${文本}」？`}</text>
                <horizontal>
                    <button id="是" text="是" />
                    <button id="否" text="否" />
                </horizontal>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        w.是.click(() => {
            结果 = true
            w.是.enabled = false
            w.否.enabled = true
            w.下一步.enabled = true
        })
        w.否.click(() => {
            结果 = false
            w.否.enabled = false
            w.是.enabled = true
            w.下一步.enabled = true
        })
        ui.run(() => {
            w.下一步.enabled = false
        })

        _自动操作(w, () => {
            结果 = 操作()
            ui.run(() => {
                if (结果) {
                    w.是.enabled = false
                    w.否.enabled = true
                } else {
                    w.否.enabled = false
                    w.是.enabled = true
                }
                w.下一步.enabled = true
            })
        })
    } else {
        结果 = 操作()
    }

    return 结果
}

能力.点击之后输入 = (手动, 元素, 文本) => {
    const 操作 = () => {
        const [x, y] = _视觉(`请问：「${元素}」坐标？`, {
            type: 'array',
            description: '坐标[x, y]',
            items: {
                type: 'number',
                minimum: 0,
                maximum: 1000,
            },
            minItems: 2,
            maxItems: 2,
        })
        global.shizuku(['shell', 'input', 'tap', Math.floor(x * device.width / 1000), Math.floor(y * device.height / 1000)])
        global.sleep(800)

        global.setClip(文本)
        global.shizuku(['shell', 'input', 'keyevent', 'KEYCODE_PASTE'])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：点击「${元素}」。`}</text>
                <button id="自动操作" text="自动操作" />
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </vertical>
        )

        _自动操作(w, () => {
            操作()
        })
    } else {
        操作()
    }
}

const 脚本 = {}

脚本.准备快手 = () => {
    能力.安装注册登录('快手')
    能力.完成(true)
}

脚本.快手收妹妹 = (手动) => {
    能力.进入主页(手动, '快手', 'com.smile.gifmaker')
    能力.点击之后输入(手动, '右上角搜索图标', '收妹妹处兄妹')
    翻作品: for (; ;) {
        能力.点击(手动, '右上角搜索按钮')
        能力.点击(手动, '第一条作品')
        能力.点击(手动, '右侧评论区图标')
        能力.点击(手动, '评论条数标签')
        能力.点击(手动, '按最新排序按钮')
        翻评论区: for (; ;) {
            if (能力.检查若是则先点击(手动, '有评论要哥哥的', '用户头像')) {
                if (能力.检查若是则先点击(手动, '未关注', '关注按钮')) {
                    能力.点击(手动, '发私信按钮')
                    能力.点击之后输入(手动, '底部消息输入框', '我想收一些妹妹，你能当我妹妹吗')
                    if (能力.点击之后看见(手动, '右下角发送图标', '上限')) {
                        能力.完成(手动)
                    }
                    能力.回到上一页(手动, '用户主页')
                }
                能力.回到上一页(手动, '评论区')
            }
            if (能力.检查(手动, '翻到底了或没有一天内的评论了')) {
                能力.回到上一页(手动, '作品页')
                能力.回到上一页(手动, '搜索结果页')
                continue 翻作品
            } else {
                能力.向下滚动(手动)
                continue 翻评论区
            }
        }
    }
}

function 执行(程序, 回调) {
    threads.start(() => {
        try {
            程序()
            throw new Error('开发者忘记加完成这一步了')
        } catch (e) {
            switch (e.message) {
                case '跳出': {
                    global.toastLog('用户跳出脚本')
                    回调()
                    break
                }
                case '完成': {
                    global.toastLog('用户完成脚本')
                    回调()
                    break
                }
                default: {
                    throw e
                }
            }
        }
    })
}

执行(() => {
    脚本.准备快手()
}, () => {
    执行(() => {
        脚本.快手收妹妹(true)
    }, () => {

    })
})