# components list

react components list

1. [Modal](#Modal)


## Modal

自己实现一个 Modal 弹框组件。

要求：

1、能够相应确定取消事件

2、能够展示对话框内容

3、能够实现国际化

[link](./Modal)

usage

|属性|说明|默认值|类型|
| :--: | :--------: | :--: | :--: |
| onOk | 点击确定的回调函数 |noop| function |
| onCancel | 点击取消的回调函数 |noop| function |
| conFirmText |  确定按钮自定义文字 |'确定'| string |
| cancelText | 取消按钮自定义文字 | '取消' | string |
| titleClass | 对话框 title 自定义样式 |'modal-title'| string |
| contentClass | 对话框内容自定义样式  |'modal-text'| string |
| footerClass | 对话框确定取消按钮容器自定义样式 |'modal-footer| string |
| okClass | 对话框确定按钮自定义样式 |'modal-confirm'| string |
| cancelClass | 对话框取消按钮自定义样式 |'modal-cancel'| string|
| height | 对话框宽度 | 'auto' | string |
| width | 对话框高度 | '400px' | string |
| opacity | 对话框透明度 | 0.6 | nunmber |



