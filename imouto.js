const 能力 = {}

能力.完成 = (手动) => {
    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">拖动</text>
                <button id="完成" text="完成" />
            </vertical>
        )

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.完成.click(() => {
            flag = false
        })
    }

    throw '完成'
}

能力.安装注册登录 = (应用名) => {
    const w = floaty.window(
        <vertical>
            <text id="拖动">✥</text>
            <text>{`请您：安装、注册、登录「${应用名}」。`}</text>
            <button id="下一步" text="下一步" />
        </vertical>
    )

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

    let flag = true
    while (flag) {
        global.sleep(80)
    }

    w.下一步.click(() => {
        flag = false
    })
}

能力.进入主页 = (手动, 应用名, 包名) => {
    const 操作 = () => {
        shizuku.cmd(['shell', 'am', 'force-stop', 包名])
        shizuku.cmd(['shell', 'monkey', '-p', 包名, '-c', 'android.intent.category.LAUNCHER', '1'])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：进入「${应用名}」主页。`}</text>
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                操作()
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        操作()
    }
}

能力.回到上一页 = (手动, 页名) => {
    const 操作 = () => {
        shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：返回「${页名}」。`}</text>
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                操作()
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        操作()
    }
}

能力.向下滚动 = (手动) => {
    const 操作 = () => {
        shizuku.cmd(['shell', 'input', 'swipe', device.width * 0.5, device.height * 0.6, device.width * 0.5, device.height * 0.4, 1000])
        global.sleep(800)
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：向下滚动。`}</text>
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                操作()
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        操作()
    }
}

能力.检查 = (手动, 内容) => {
    const 操作 = () => {
        const path = files.path('截图.png')
        shizuku.cmd(['shell', 'screencap', '-p', path])
        let err
        for (let i = 0; i < 5; i++) {
            try {
                const response = http.postJson(`${BASE_URL}/chat/completions`, {
                    model: MODEL,
                    messages: [
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
                            content: `请问：是否「${内容}」？`
                        }
                    ],
                    response_format: {
                        type: 'json_schema',
                        json_schema: {
                            name: 'bool',
                            strict: true,
                            schema: {
                                type: 'boolean',
                                description: '结果',
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
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" disabled />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                结果 = 操作()
                if (结果) {
                    w.是.disabled = true
                    w.否.disabled = false
                } else {
                    w.否.disabled = true
                    w.是.disabled = false
                }
                ui.下一步.disabled = false
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

        w.是.click(() => {
            结果 = true
            w.是.disabled = true
            w.否.disabled = false
            ui.下一步.disabled = false
        })
        w.否.click(() => {
            结果 = false
            w.否.disabled = true
            w.是.disabled = false
            ui.下一步.disabled = false
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        结果 = 操作()
    }

    return 结果
}

能力.点击 = (手动, 元素) => {
    const 操作 = () => {
        const path = files.path('截图.png')
        shizuku.cmd(['shell', 'screencap', '-p', path])
        let err
        for (let i = 0; i < 5; i++) {
            try {
                const response = http.postJson(`${BASE_URL}/chat/completions`, {
                    model: MODEL,
                    messages: [
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
                            content: `请问：「${元素}」坐标？`
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
                global.sleep(800)
                return
            } catch (e) {
                err = e
            }
        }
        throw err
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：点击「${元素}」`}。</text>
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                操作()
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        操作()
    }
}

能力.检查若是则先点击 = (手动, 内容, 元素) => {
    const 操作 = () => {
        const path = files.path('截图.png')
        shizuku.cmd(['shell', 'screencap', '-p', path])
        let err
        for (let i = 0; i < 5; i++) {
            try {
                const response = http.postJson(`${BASE_URL}/chat/completions`, {
                    model: MODEL,
                    messages: [
                        {
                            role: 'system',
                            content: '你是界面操作员。'
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
                            content: `根据屏幕检查${内容}是正确还是错误，若正确则定位屏幕上的${元素}，若错误则输出null。`
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
                                        description: '错误'
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
                global.sleep(800)
                return true
            } catch (e) {
                err = e
            }
        }
        throw err
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
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" disabled />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                结果 = 操作()
                if (结果) {
                    w.是.disabled = true
                    w.否.disabled = false
                } else {
                    w.否.disabled = true
                    w.是.disabled = false
                }
                ui.下一步.disabled = false
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

        w.是.click(() => {
            结果 = true
            w.是.disabled = true
            w.否.disabled = false
            ui.下一步.disabled = false
        })
        w.否.click(() => {
            结果 = false
            w.否.disabled = true
            w.是.disabled = false
            ui.下一步.disabled = false
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        结果 = 操作()
    }

    return 结果
}

能力.点击之后看见 = (手动, 元素, 文本) => {
    const 操作 = () => {
        const path = files.path('截图.png')
        shizuku.cmd(['shell', 'screencap', '-p', path])
        let err
        for (let i = 0; i < 5; i++) {
            try {
                const response = http.postJson(`${BASE_URL}/chat/completions`, {
                    model: MODEL,
                    messages: [
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
                            content: `请问：「${元素}」坐标？`
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
                global.sleep(800)
                const texts = ocr.recognizeText(path)
                for (let i = 0; i < texts.length; i++) {
                    if (texts[i].indexOf(文本) !== -1) return true
                }
                return false
            } catch (e) {
                err = e
            }
        }
        throw err
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
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" disabled />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                结果 = 操作()
                if (结果) {
                    w.是.disabled = true
                    w.否.disabled = false
                } else {
                    w.否.disabled = true
                    w.是.disabled = false
                }
                ui.下一步.disabled = false
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

        w.是.click(() => {
            结果 = true
            w.是.disabled = true
            w.否.disabled = false
            ui.下一步.disabled = false
        })
        w.否.click(() => {
            结果 = false
            w.否.disabled = true
            w.是.disabled = false
            ui.下一步.disabled = false
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        结果 = 操作()
    }

    return 结果
}

能力.点击之后输入 = (手动, 元素, 文本) => {
    const 操作 = () => {
        const path = files.path('截图.png')
        shizuku.cmd(['shell', 'screencap', '-p', path])
        let err
        for (let i = 0; i < 5; i++) {
            try {
                const response = http.postJson(`${BASE_URL}/chat/completions`, {
                    model: MODEL,
                    messages: [
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
                            content: `请问：「${元素}」坐标？`
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
                global.sleep(800)
                global.setClip(文本)
                shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_PASTE'])
                global.sleep(800)
                return
            } catch (e) {
                err = e
            }
        }
        throw err
    }

    if (手动) {
        const w = floaty.window(
            <vertical>
                <text id="拖动">✥</text>
                <text>{`请您：点击「${元素}」`}。</text>
                <button id="尝试自动操作" text="尝试自动操作" />
                <button id="下一步" text="下一步" />
            </vertical>
        )

        w.尝试自动操作.click(() => {
            ui.尝试自动操作.disabled = true
            threads.run(() => {
                操作()
                ui.run(() => {
                    ui.尝试自动操作.disabled = false
                })
            })
        })

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

        let flag = true
        while (flag) {
            global.sleep(80)
        }

        w.下一步.click(() => {
            flag = false
        })
    } else {
        操作()
    }
}