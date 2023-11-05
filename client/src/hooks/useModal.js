import { useContext } from 'react'
import { ModalContext } from '@contexts/modalContext'

const useModal = () => {
    
    const { alert, showAlert, hideAlert, confirm, showConfirm, hideConfirm, prompt, showPrompt, hidePrompt, isLoading, showLoading, hideLoading } = useContext(ModalContext)

    const alertModal = {
        state: alert,
        show: (title, message, onCancel) => showAlert(title, message, onCancel),
        hide: () => hideAlert(),
        showPromise: (title, message) => new Promise((resolve, reject) => {
            showAlert(title, message, () => resolve())
        })
    }
    
    const confirmModal = {
        state: confirm,
        show: (title, message, onConfirm, onCancel) => showConfirm(title, message, onConfirm, onCancel),
        hide: () => hideConfirm(),
        showPromise: (title, message) => new Promise((resolve, reject) => {
            showConfirm(title, message, () => resolve(), () => reject())
        })
    }
    
    const promptModal = {
        state: prompt,
        show: (title, message, onConfirm, onCancel, invalidValues = []) => showPrompt(title, message, onConfirm, onCancel, invalidValues),
        hide: () => hidePrompt(),
        showPromise: (title, message, invalidValues = []) => new Promise((resolve, reject) => {
            showPrompt(title, message, (value) => resolve(value), () => reject(), invalidValues)
        })
    }
    
    const loadingModal = {
        state: isLoading,
        show: () => showLoading(),
        hide: () => hideLoading()
    }
    
    return { alertModal, confirmModal, promptModal, loadingModal }
}

export default useModal