'ui'

const 视觉模型 = storages.create('视觉模型')
let API_KEY = 视觉模型.get('API_KEY', "")
let BASE_URL = 视觉模型.get('BASE_URL', "")
let MODEL = 视觉模型.get('MODEL', "")

const 缓存 = storages.create('缓存')
storages.create('记忆').clear()

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
    global.shizuku(`screencap -p ${JSON.stringify(path)}`)
    const raw = images.read(path)
    if (!raw) {
        throw new Error('截图失败')
    }
    const j = {
        type: 'object',
        properties: {
            结果: schema
        },
        additionalProperties: false,
        required: ['结果']
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
                                role: 'system',
                                content: `必须输出JSON（禁止用代码块包裹）：${JSON.stringify(j)}`
                            },
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
                        ]
                    }, {
                        headers: {
                            'Authorization': `Bearer ${API_KEY}`
                        }
                    })
                    const json = response.body.json()
                    log(JSON.stringify(json))
                    return JSON.parse(json.choices[0].message.content).结果
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
        w.root.attr('visibility', 'gone')
        threads.start(() => {
            try {
                动作()
            } catch (e) {
                toastLog(e.message)
            }
            ui.run(() => {
                w.root.attr('visibility', 'visible')
            })
        })
    })

    _浮动(w)
}

function _没判断(xml, 手动, 操作) {
    if (手动) {
        const w = floaty.window(xml)

        _自动操作(w, () => {
            操作()
        })
    } else {
        操作()
    }
}

function _有判断(xml, 手动, 操作) {
    let 结果
    if (手动) {
        const w = floaty.window(xml)

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

能力.完成 = (手动) => {
    if (手动) {
        _浮动(floaty.window(
            <vertical id="root" bg="white" padding="25">
                <text id="拖动" textSize="40">✥</text>
                <horizontal>
                    <button id="下一步" text="完成" />
                    <button id="跳出" text="跳出" />
                </horizontal>
            </vertical>
        ))
    }

    throw new Error('完成')
}

能力.安装注册登录 = (平台) => {
    _浮动(floaty.window(
        <vertical id="root" bg="white" padding="25">
            <text id="拖动" textSize="40">✥</text>
            <text>{`请您：安装、注册、登录「${平台}」。`}</text>
            <horizontal>
                <button id="下一步" text="下一步" />
                <button id="跳出" text="跳出" />
            </horizontal>
        </vertical>
    ))
}

能力.进入主页 = (手动, 平台, 包名) => {
    _没判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请您：进入「${平台}」主页。`}</text>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        global.shizuku(`am force-stop ${JSON.stringify(包名)}`)
        global.shizuku(`monkey -p ${JSON.stringify(包名)} -c android.intent.category.LAUNCHER 1`)
        global.sleep(1000)
    })
}

能力.回到上一页 = (手动, 页名) => {
    _没判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请您：返回「${页名}」。`}</text>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        global.shizuku(`input keyevent KEYCODE_BACK`)
        global.sleep(1000)
    })
}

能力.向下滚动 = (手动) => {
    _没判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请您：向下滚动。`}</text>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        global.shizuku(`input swipe ${device.width * 0.5} ${device.height * 0.75} ${device.width * 0.5} ${device.height * 0.25} 3000`)
        global.sleep(1000)
    })
}

能力.检查 = (手动, 内容) => {
    return _有判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请问：是否「${内容}」？`}</text>
        <horizontal>
            <button id="是" text="是" />
            <button id="否" text="否" />
        </horizontal>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        return _视觉(`请问：是否「${内容}」？`, { type: 'boolean' })
    })
}

能力.点击 = (手动, 元素, 页面, 平台) => {
    _没判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请您：点击「${元素}」。`}</text>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        let key, 平台缓存, point, rx, ry
        if (页面 && 平台) {
            key = JSON.stringify([页面, 元素])
            平台缓存 = 缓存.get(平台, {})
            point = 平台缓存[key]
        }
        if (point) {
            rx = point[0]
            ry = point[1]
            global.sleep(1000)
        } else {
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
            rx = Math.floor(x * device.width / 1000)
            ry = Math.floor(y * device.height / 1000)
            if (key) {
                平台缓存[key] = [rx, ry]
                缓存.put(平台, 平台缓存)
            }
        }
        log(`${rx} ${ry}`)
        global.shizuku(`input tap ${rx} ${ry}`)
        global.sleep(1000)
    })
}

能力.检查若是则先点击 = (手动, 内容, 元素) => {
    return _有判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请问：是否「${内容}」？若是，则请您先：点击「${元素}」`}</text>
        <horizontal>
            <button id="是" text="是" />
            <button id="否" text="否" />
        </horizontal>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        const 返回 = _视觉(`请问：是否「${内容}」？若是，请问：「${元素}」坐标？若否，请输出null。`, {
            anyOf: [
                {
                    type: 'array',
                    description: '[x, y]',
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
                },
            ],
        })
        if (!返回) return false
        const [x, y] = 返回
        log(`${Math.floor(x * device.width / 1000)} ${Math.floor(y * device.height / 1000)}`)
        global.shizuku(`input tap ${Math.floor(x * device.width / 1000)} ${Math.floor(y * device.height / 1000)}`)
        global.sleep(1000)
        return true
    })
}

能力.点击之后看见 = (手动, 元素, 文本, 页面, 平台) => {
    return _有判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请您：点击「${元素}」。然后立刻判断：是否看见「${文本}」这几个字？`}</text>
        <horizontal>
            <button id="是" text="是" />
            <button id="否" text="否" />
        </horizontal>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        let key, 平台缓存, point, rx, ry
        if (页面 && 平台) {
            key = JSON.stringify([页面, 元素])
            平台缓存 = 缓存.get(平台, {})
            point = 平台缓存[key]
        }
        if (point) {
            rx = point[0]
            ry = point[1]
            global.sleep(1000)
        } else {
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
            rx = Math.floor(x * device.width / 1000)
            ry = Math.floor(y * device.height / 1000)
            if (key) {
                平台缓存[key] = [rx, ry]
                缓存.put(平台, 平台缓存)
            }
        }
        log(`${rx} ${ry}`)
        global.shizuku(`input tap ${rx} ${ry}`)
        global.sleep(1000)

        const path = files.path('截图.png')
        global.shizuku(`screencap -p ${JSON.stringify(path)}`)
        const texts = ocr.recognizeText(path)
        for (let i = 0; i < texts.length; i++) {
            if (texts[i].indexOf(文本) !== -1) {
                return true
            }
        }
        return false
    })
}

能力.点击之后输入 = (手动, 元素, 文本, 页面, 平台) => {
    _没判断(<vertical id="root" bg="white" padding="25">
        <text id="拖动" textSize="40">✥</text>
        <text>{`请您：点击「${元素}」。然后输入「${文本}」。`}</text>
        <button id="自动操作" text="自动操作" />
        <horizontal>
            <button id="下一步" text="下一步" />
            <button id="跳出" text="跳出" />
        </horizontal>
    </vertical>, 手动, () => {
        global.setClip(文本)
        let key, 平台缓存, point, rx, ry
        if (页面 && 平台) {
            key = JSON.stringify([页面, 元素])
            平台缓存 = 缓存.get(平台, {})
            point = 平台缓存[key]
        }
        if (point) {
            rx = point[0]
            ry = point[1]
            global.sleep(1000)
        } else {
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
            rx = Math.floor(x * device.width / 1000)
            ry = Math.floor(y * device.height / 1000)
            if (key) {
                平台缓存[key] = [rx, ry]
                缓存.put(平台, 平台缓存)
            }
        }
        log(`${rx} ${ry}`)
        global.shizuku(`input tap ${rx} ${ry}`)
        global.sleep(1000)

        global.shizuku(`input keyevent KEYCODE_PASTE`)
        global.sleep(1000)
    })
}

const 脚本 = {}

脚本.准备快手 = () => {
    能力.安装注册登录('快手')
    能力.完成(true)
}

脚本.快手收妹妹 = (手动) => {
    能力.进入主页(手动, '快手', 'com.smile.gifmaker')
    能力.点击之后输入(手动, '右上角搜索图标', '收妹妹处兄妹', '主页', '快手')
    能力.点击(手动, '右上角搜索按钮', '搜索页', '快手')
    能力.点击(手动, '右上角漏斗图标', '搜索结果页', '快手')
    能力.点击(手动, '下方未看过标签', '搜索结果筛选页', '快手')
    能力.点击(手动, '底部确定按钮', '搜索结果筛选页', '快手')
    翻作品: for (; ;) {
        能力.点击(手动, '第一条作品', '搜索结果页', '快手')
        能力.点击(手动, '右侧评论区图标', '作品页', '快手')
        能力.点击(手动, '评论条数标签')
        能力.点击(手动, '按最新排序按钮', '评论排序', '快手')
        翻评论区: for (; ;) {
            if (能力.检查若是则先点击(手动, '有一天内评论要哥哥的', '用户头像')) {
                if (能力.检查(手动, '未关注')) {
                    能力.点击(手动, '关注按钮', '用户主页', '快手')
                    能力.点击(手动, '发私信按钮', '用户主页', '快手')
                    能力.点击之后输入(手动, '底部消息输入框', '我想收一些妹妹，你能当我妹妹吗', '私信页', '快手')
                    if (能力.点击之后看见(手动, '右下角发送图标', '上限', '私信页', '快手')) {
                        能力.完成(手动)
                    }
                    能力.回到上一页(手动, '用户主页')
                }
                能力.回到上一页(手动, '评论区')
            }
            if (能力.检查(手动, '翻到底了或没有一天内的评论了')) {
                能力.回到上一页(手动, '作品页')
                能力.回到上一页(手动, '搜索结果页')
                能力.点击(手动, '右上角筛选图标', '搜索结果页', '快手')
                能力.点击(手动, '底部确定按钮', '搜索结果筛选页', '快手')
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
                    ui.run(回调)
                    break
                }
                case '完成': {
                    global.toastLog('用户完成脚本')
                    ui.run(回调)
                    break
                }
                default: {
                    throw e
                }
            }
        }
    })
}

ui.layout(
    <vertical>
        <text textSize="40"># 赛博家庭SOP</text>
        <vertical>
            <horizontal>
                <text textSize="35">## 配置</text>
                <button id="收起展开配置" text="展开" />
            </horizontal>
            <vertical id="配置" visibility="gone">
                <vertical>
                    <text textSize="30">Shizuku</text>
                    <button id="Shizuku" text="检查" />
                </vertical>
                <vertical>
                    <text textSize="30">视觉模型</text>
                    <input id="API_KEY" hint="API_KEY" text={API_KEY} />
                    <input id="BASE_URL" hint="BASE_URL" text={BASE_URL} />
                    <input id="MODEL" hint="MODEL" text={MODEL} />
                    <button id="视觉模型" text="保存并检查" />
                </vertical>
            </vertical>
        </vertical>
        <vertical>
            <horizontal>
                <text textSize="35">## 平台</text>
                <button id="收起展开平台" text="展开" />
            </horizontal>
            <vertical id="平台" visibility="gone">
                <horizontal>
                    <text textSize="30">### 快手</text>
                    <button id="管理快手缓存" text="管理缓存" />
                </horizontal>
                <horizontal>
                    <text textSize="25">准备：</text>
                    <button id="准备快手" text="手动" />
                </horizontal>
                <horizontal>
                    <text textSize="25">收妹妹：</text>
                    <button id="快手收妹妹手动" text="手动" />
                    <button id="快手收妹妹自动" text="自动" />
                </horizontal>
            </vertical>
        </vertical>
    </vertical>
)

ui.收起展开配置.click(() => {
    if (ui.收起展开配置.getText() === '展开') {
        ui.配置.attr('visibility', 'visible')
        ui.收起展开配置.setText('收起')
    } else {
        ui.配置.attr('visibility', 'gone')
        ui.收起展开配置.setText('展开')
    }
})

ui.收起展开平台.click(() => {
    if (ui.收起展开平台.getText() === '展开') {
        ui.平台.attr('visibility', 'visible')
        ui.收起展开平台.setText('收起')
    } else {
        ui.平台.attr('visibility', 'gone')
        ui.收起展开平台.setText('展开')
    }
})

ui.Shizuku.click(() => {
    ui.Shizuku.enabled = false
    threads.start(() => {
        try {
            toastLog(global.shizuku('sh -c "echo 成功"').result.split('\n')[0])
        } catch (e) {
            toastLog(e.message)
        }
        ui.run(() => ui.Shizuku.enabled = true)
    })
})

ui.视觉模型.click(() => {
    ui.视觉模型.enabled = false
    API_KEY = ui.API_KEY.getText()
    BASE_URL = ui.BASE_URL.getText()
    MODEL = ui.MODEL.getText()
    视觉模型.put('API_KEY', API_KEY)
    视觉模型.put('BASE_URL', BASE_URL)
    视觉模型.put('MODEL', MODEL)
    const j = {
        type: 'object',
        properties: {
            结果: {
                type: 'string'
            }
        },
        additionalProperties: false,
        required: ['结果']
    }
    threads.start(() => {
        try {
            const response = http.postJson(`${BASE_URL}/chat/completions`, {
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: `必须输出JSON（禁止用代码块包裹）：${JSON.stringify(j)}`
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: '输出「成功」。'
                            }
                        ]
                    }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            })
            const json = response.body.json()
            log(JSON.stringify(json))
            toastLog(JSON.parse(json.choices[0].message.content).结果)
        } catch (e) {
            toastLog(e.message)
        }
        ui.run(() => ui.视觉模型.enabled = true)
    })
})

function 管理缓存(平台) {
    const 平台缓存 = 缓存.get(平台, {})
    const memo = () => Object.entries(平台缓存).map(([键, [x, y]]) => ({ 键, x, y }))
    const w = floaty.window(
        <vertical bg="white" padding="25">
            <button text="关闭" id="关闭" />
            <list id="list">
                <vertical>
                    <text textSize="15" id="键" text="{{键}}" />
                    <horizontal>
                        <text id="x" text="x：{{x}}" marginRight="15"/>
                        <text id="y" text="y：{{y}}" />
                    </horizontal>
                    <button id="删除" text="删除" />
                </vertical>
            </list>
        </vertical>
    )
    w.list.setDataSource(memo())
    w.list.on('item_bind', (view, holder) => {
        view.删除.on('click', () => {
            delete 平台缓存[holder.item.键]
            缓存.put(平台, 平台缓存)
            w.list.setDataSource(memo())
        })
    })
    w.关闭.click(() => {
        w.close()
    })
}

ui.管理快手缓存.click(() => {
    管理缓存('快手')
})

ui.准备快手.click(() => {
    ui.准备快手.enabled = false
    执行(() => 脚本.准备快手(), () => ui.准备快手.enabled = true)
})

ui.快手收妹妹手动.click(() => {
    ui.快手收妹妹手动.enabled = false
    执行(() => 脚本.快手收妹妹(true), () => ui.快手收妹妹手动.enabled = true)
})

ui.快手收妹妹自动.click(() => {
    ui.快手收妹妹自动.enabled = false
    执行(() => 脚本.快手收妹妹(false), () => ui.快手收妹妹自动.enabled = true)
})