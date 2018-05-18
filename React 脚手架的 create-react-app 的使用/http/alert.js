import { notification, Modal } from 'antd';

const noop = () => { };
const confirm = Modal.confirm;

/**
 * 调用提示框
 *
 * @param  title        提示框标题
 * @param  description  提示描述
 * @param  type         提示类型(error, warning, success, info)
 */
export function callNotice(title, description, type) {
  notification[type]({
    message: title,
    description,
  })
}

/**
 * 调用确认框
 *
 * @param  title    确认框标题
 * @param  content  确认内容
 * @param  onOK     点击确定回调方法(默认空方法)
 * @param  onCanel  点击取消回调方法(默认空方法)
 */
export function callConfirm(title, content, onOk = noop, onCancel = noop) {
  confirm({ title, content, onOk, onCancel });
}
