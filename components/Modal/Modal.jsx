import React from 'react'
import './Modal.css'

const Modal = props => props.visible ? (<div className="modal-box" style={{backgroundColor:`rgba(0, 0, 0, ${props.opacity})`}}>
<div className="modal-content" style={{width:props.width,height:props.height}}>
    <div className={props.titleClass}>{props.title}</div>
    <div className={props.contentClass}>{props.content}</div>
    <div className={props.footerClass}>
        <div onClick={props.onOk} className={props.okClass}>{props.conFirmText}</div>
        <div onClick={props.onCancel} className={props.cancelClass}>{props.cancelText}</div>
    </div>
</div>
</div>) : null

const noop = _=> undefined

Modal.defaultProps = {
    onOk: noop,
    onCancel: noop,
    conFirmText: '确定',
    cancelText: '取消',
    titleClass: 'modal-title',
    contentClass: 'modal-text',
    footerClass: 'modal-footer',
    okClass: 'modal-confirm',
    cancelClass: 'modal-cancel',
    height:'auto',
    width:'400px',
    opacity: 0.6
}

export default Modal