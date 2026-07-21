import OpenAI from 'openai'

const 身份 = '22岁男生', 关系 = '网上的兄妹关系', 语境 = '妹妹因为我回的慢而生气', 时机 = '晚上八点', 格式 = '十五个字以内', 目标 = '让妹妹适应我回的慢'

const messages = [
    {
        "role": "system",
        "content": [
            {
                "type": "text",
                "text": "你是对话生成器，目前在帮用户想怎么回消息，必须生成建议用户回复的内容字符串（不回/文本：<文本内容>/图片：<图片描述>/语音：<语音台词>）。"
            }
        ]
    },
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": `我是${身份}，我们是${关系}，目前${语境}，当前${时机}，必须${格式}，需要${目标}。`
            },
            {
                "type": "text",
                "text": "如果有想说的，就提问或回答；如果不知道说什么，就语气词或表情包。如果说什么都可以，就简单一些；如果说什么都不对，就什么也不回。"
            }
        ]
    }
]

const client = new OpenAI({
    apiKey: process.env['API_KEY'],
    baseURL: 'https://api.chatanywhere.tech/v1'
})

const completion = await client.chat.completions.create({
    model: 'gemini-3.5-flash',
    messages,
})

console.log(completion.choices[0].message.content)