# 快手收妹妹标准作业程序

## 准备

装好快手的安卓手机一台。

## 开始

1. 执行[重启快手](#reboot-kuai)工序
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

### 重启快手 {#reboot-kuai}

1. 执行[关闭快手](#close-kuai)操作
2. 执行[打开快手](#open-kuai)操作

```js
function rebootKuai() {
    shizuku.cmd(closeKuai)
    shizuku.cmd(openKuai)
}
```

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

### 点击右上角搜索图标 {#click-top-right-search-icon}

```js
function clickTopRightSearchIcon() {
    // TODO
}
```

### 在快手搜索页 {#at-kuai-search-page}

1. 执行[输入收妹妹搜索词](#type-require-sister-search-query)工序
2. 循环执行[快手搜索](#kuai-search)工序直到得到[应该结束](#should-break)答复
3. 按返回键

```js
function atKuaiSearchPage() {
    typeRequireSisterSearchQuery()
    for (;;) if (kuaiSearch() === SHOULD_BREAK) break
    back()
}
```

### 输入收妹妹搜索词 {#type-require-sister-search-query}

1. 复制“收妹妹处兄妹”
2. 执行[粘贴](#paste)操作

```js
function typeRequireSisterSearchQuery() {
    setClip('收妹妹处兄妹')
    paste()
}
```

### 快手搜索 {#kuai-search}

答复为[应该结束](#should-break)或[应该继续](#should-continue)

1. 执行[点击右上角搜索按钮](#click-top-right-search-button)工序
2. 执行[点击第一条作品](#click-first-work)工序
3. 执行[在快手作品页](#at-kuai-work-page)工序，将得到的答复临时记录为`x`
4. 按返回键
5. 提交临时记录`x`作为答复

```js
function kuaiSearch(): YES | NO {
    clickTopRightClickButton()
    clickFirstWork()
    const x = atKuaiWorkPage()
    back()
    return x
}
```

### 点击右上角搜索按钮 {#click-top-right-search-button}

```js
function clickTopRightSearchButton() {
    // TODO
}
```

### 点击第一条作品 {#click-first-work}

```js
function clickFirstWork() {
    // TODO
}
```

### 在快手作品页 {#at-kuai-work-page}

```js
function atKuaiWorkPage() {

}
```

## 操作

### 关闭快手 {#close-kuai}

```js
const closeKuai = ['shell', 'am', 'force-stop', 'com.smile.gifmaker']
```

### 打开快手 {#open-kuai}

```js
const openKuai = ['shell', 'monkey', '-p', 'com.smile.gifmaker', '-c', 'android.intent.category.LAUNCHER', '1']
```

### 粘贴 {#paste}

```js
const paste = ['shell', 'input', 'keyevent', 'KEYCODE_PASTE']
```

## 答复

### 应该结束 {#should-break}

```js
const SHOULD_BREAK: '应该结束' = '应该结束'
```

### 应该继续 {#should-continue}

```js
const SHOULD_CONTINUE: '应该继续' = '应该继续'
```
