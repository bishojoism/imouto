// 1. 复制「收妹妹处兄妹」
global.setClip('收妹妹处兄妹')

// 2. 关闭快手
shizuku.cmd(['shell', 'am', 'force-stop', 'com.smile.gifmaker'])

// 3. 打开快手并等待
shizuku.cmd(['shell', 'monkey', '-p', 'com.smile.gifmaker', '-c', 'android.intent.category.LAUNCHER', '1'])
global.sleep(1000)

// 4. 点击右上角搜索图标
ai.点击('右上角搜索图标')

// 5. 粘贴「收妹妹处兄妹」
shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_PASTE'])

// 6. 复制「我想收一些妹妹，你能当我妹妹吗」
global.setClip('我想收一些妹妹，你能当我妹妹吗')

// 7. **不断**
for (; ;) {
    // 1. 点击右上角搜索按钮（再次点击即可起到刷新搜索结果的作用）
    ai.点击('右上角搜索按钮')

    // 2. 点击第一条作品（离开搜索结果页，进入作品页）
    ai.点击('第一条作品')

    // 3. 点击右侧评论区图标（离开作品页，进入评论区）
    ai.点击('右侧评论区图标')

    // 4. 点击评论条数标签
    ai.点击('评论条数标签')

    // 5. 点击按最新排序按钮
    ai.点击('按最新排序按钮')

    // 6. **不断**`翻评论区`
    for (; ;) {
        // 1. 点击评论要哥哥的用户头像（离开评论区，进入用户主页）
        ai.有则点击('评论要哥哥的用户头像', () => {
            // 1. 若还没关注
            if (ai.检查('还没关注')) {
                // 1. 点击关注按钮
                ai.点击('关注按钮')

                // 2. 点击发私信按钮（离开用户主页，进入私信界面）
                ai.点击('发私信按钮')

                // 3. 点击底部消息输入框
                ai.点击('底部消息输入框')

                // 4. 粘贴「我想收一些妹妹，你能当我妹妹吗」
                shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_PASTE'])

                // 5. 点击右下角发送图标
                ai.点击('右下角发送图标')

                // 6. 若发送失败，则关闭快手并退出程序（**整个流程结束**）
                if (ai.检查('发送失败')) { shizuku.cmd(['shell', 'am', 'force-stop', 'com.smile.gifmaker']); global.exit() }

                // 7. 按返回键（退出私信界面，回到用户主页）并等待
                shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
                global.sleep(1000)
            }

            // 2. 按返回键（退出用户主页，回到评论区）并等待
            shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
            global.sleep(1000)
        })

        // 2. 若翻到底了，则**打破**`翻评论区`，否则向下滚动并等待
        if (ai.检查('翻到底了')) { break } else {
            let sizeStr = shizuku.cmd(['shell', 'wm', 'size']);

            let match = sizeStr.match(/(\d+)x(\d+)/);
            if (match) {
                let w = parseInt(match[1]);
                let h = parseInt(match[2]);

                let x = Math.floor(w / 2);
                let y1 = Math.floor(h * 0.6);
                let y2 = Math.floor(h * 0.4);

                shizuku.cmd(['shell', `input swipe ${x} ${y1} ${x} ${y2} 1000`]);
                global.sleep(1000)
            }
        }
    }

    // 7. 按返回键（退出评论区，回到作品页）并等待
    shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
    global.sleep(1000)

    // 8. 按返回键（退出作品页，回到搜索结果页）并等待
    shizuku.cmd(['shell', 'input', 'keyevent', 'KEYCODE_BACK'])
    global.sleep(1000)
}