# 快手收妹妹标准作业程序

## 准备

装好快手的安卓手机一台。

## 总览

1. [关闭快手](#close-kuai)
2. [打开快手](#open-kuai)
3. [点击右上角搜索图标](#click-top-right-search-icon)
4. 复制「收妹妹处兄妹」并粘贴
5. **不断**：
    1. [点击右上角搜索按钮](#click-top-right-search-button)（再次点击即可起到刷新搜索结果的作用）
    2. [点击第一条作品](#click-first-work)（离开搜索结果页，进入作品页）
    3. [点击右侧打开评论区图标](#click-right-open-comments-icon)（离开作品页，进入评论区）
    4. [点击评论条数标签](#click-comments-length-label)
    5. [点击按时间排序按钮](#click-sort-by-time-button)
    6. **不断**`翻评论区`：
        1. [等待评论区加载](#wait-comments-load)
        2. [点击评论要哥哥的用户头像](#click-comment-require-brother-user-avatar)（离开评论区，进入用户主页）
        3. 若[还没关注](#not-follow)：
            1. [点击关注按钮](#click-follow-button)
            2. [点击发私信按钮](#click-send-message-button)（离开用户主页，进入私信界面）
            3. [点击下方消息输入框](#click-bottom-message-input-aria)
            4. 复制「我想收一些妹妹，你能当我妹妹吗」并粘贴
            5. [点击右下角发送图标](#click-right-bottom-send-icon)
            6. 若[发送失败](#send-failed)：[关闭快手](#close-kuai)并[退出程序](#exit-program)（**整个流程结束**）
            7. 按返回键（退出私信界面，回到用户主页）
        4. 按返回键（退出用户主页，回到评论区）
        5. 若[翻到底了](#turned-to-the-bottom)，则**打破**`翻评论区`，否则[向下滚动](#scroll-down)
    7. 按返回键（退出评论区，回到作品页）
    8. 按返回键（退出作品页，回到搜索结果页）

## 开始

1. 执行[拿到手机](#reboot-kuai)工序
2. 执行[在快手首页](#at-kuai-home-page)工序
3. 按返回键
4. 按返回键

```js
rebootKuai()
atKuaiHomePage()
back()
back()
```

## 工序

### 拿到手机 {#reboot-kuai}

1. 执行[关闭快手](#close-kuai)操作
2. 执行[打开快手](#open-kuai)操作

```js
function rebootKuai() {
    shizuku.cmd(closeKuai)
    shizuku.cmd(openKuai)
}
```

> - 执行自[开始](#开始)工序

### 在快手首页 {#at-kuai-home-page}

1. 执行[点击右上角搜索图标](#click-top-right-search-icon)工序
2. 执行[在快手搜索页](#at-kuai-search-page)工序
3. 按返回键

```js
function atKuaiHomePage() {
    clickTopRightSearchIcon()
    atKuaiSearchPage()
    back()
}
```

> - 执行自[开始](#开始)工序

### 点击右上角搜索图标 {#click-top-right-search-icon}

```js
function clickTopRightSearchIcon() {
    // TODO
}
```

> - 执行自[在快手首页](#at-kuai-home-page)工序

### 在快手搜索页 {#at-kuai-search-page}

1. 执行[输入收妹妹搜索词](#type-require-sister-search-query)工序
2. **不断**执行[寻找作品](#kuai-search)工序
3. 按返回键

```js
let KUAI_SEARCH_SHOULD_CONTINUE = true
function atKuaiSearchPage() {
    typeRequireSisterSearchQuery()
    do {
        kuaiSearch()
    } while (KUAI_SEARCH_SHOULD_CONTINUE)
    back()
}
```

> - 执行自[在快手首页](#at-kuai-home-page)工序

### 输入收妹妹搜索词 {#type-require-sister-search-query}

1. 复制「收妹妹处兄妹」
2. 执行[粘贴](#paste)操作

```js
function typeRequireSisterSearchQuery() {
    setClip('收妹妹处兄妹')
    paste()
}
```

> - 执行自[在快手搜索页](#at-kuai-search-page)工序

### 寻找作品 {#kuai-search}

1. 执行[点击右上角搜索按钮](#click-top-right-search-button)工序
2. 执行[点击第一条作品](#click-first-work)工序
3. 执行[在快手作品页](#at-kuai-work-page)工序
4. 按返回键

```js
function kuaiSearch()  {
    clickTopRightClickButton()
    clickFirstWork()
    atKuaiWorkPage()
    back()
}
```

> - 执行自[在快手搜索页](#at-kuai-search-page)工序

### 点击右上角搜索按钮 {#click-top-right-search-button}

```js
function clickTopRightSearchButton() {
    // TODO
}
```

> - 执行自[寻找作品](#kuai-search)工序

### 点击第一条作品 {#click-first-work}

```js
function clickFirstWork() {
    // TODO
}
```

> - 执行自[寻找作品](#kuai-search)工序

### 在快手作品页 {#at-kuai-work-page}

1. 执行[点击右侧打开评论区图标](#click-right-open-comments-icon)工序
2. 执行[在快手评论区](#at-kuai-comments)工序
3. 按返回键

```js
function atKuaiWorkPage() {
    clickRightOpenCommentsIcon()
    atKuaiComments()
    back()
}
```

> - 执行自[寻找作品](#kuai-search)工序

### 点击右侧打开评论区图标 {#click-right-open-comments-icon}

```js
function clickRightOpenCommentsIcon() {
    // TODO
}
```

> - 执行自[在快手作品页](#at-kuai-work-page)工序

### 在快手评论区 {#at-kuai-comments}

1. 执行[点击评论条数标签](#click-comments-length-label)工序
2. 执行[点击按时间排序按钮](#click-sort-by-time-button)工序
3. **不断**执行[翻评论区](#browse-comments)工序
4. 按返回键

```js
let BROWSE_COMMENTS_SHOULD_CONTINUE = true
function atKuaiComments() {
    clickCommentsLengthLabel()
    clickSortByTimeButton()
    do {
        browseComments()
    } while (BROWSE_COMMENTS_SHOULD_CONTINUE)
    back()
}
```

> - 执行自[在快手作品页](#at-kuai-work-page)工序

### 点击评论条数标签 {#click-comments-length-label}

```js
function clickCommentsLengthLabel() {
    // TODO
}
```

> - 执行自[在快手评论区](#at-kuai-comments)工序

### 点击按时间排序按钮 {#click-sort-by-time-button}

```js
function clickSortByTimeButton() {
    // TODO
}
```

> - 执行自[在快手评论区](#at-kuai-comments)工序

### 翻评论区 {#browse-comments}

```js
function browseComments() {
    // TODO
}
```

> - 执行自[在快手评论区](#at-kuai-comments)工序

## 操作

### 关闭快手 {#close-kuai}

```js
const closeKuai = ['shell', 'am', 'force-stop', 'com.smile.gifmaker']
```

> - 执行自[拿到手机](#reboot-kuai)工序

### 打开快手 {#open-kuai}

```js
const openKuai = ['shell', 'monkey', '-p', 'com.smile.gifmaker', '-c', 'android.intent.category.LAUNCHER', '1']
```

> - 执行自[拿到手机](#reboot-kuai)工序

### 粘贴 {#paste}

```js
const paste = ['shell', 'input', 'keyevent', 'KEYCODE_PASTE']
```

> - 执行自[输入收妹妹搜索词](#type-require-sister-search-query)工序
