import React from "react"
import styles from "./css/Button.module.css"

function Button({ text, isApproved, isUnactive, onClick }) {
    if (isApproved) {
        return (
            <button className={styles.approvedBtn} onClick={onClick}>
                {text}
            </button>
        )
    } else if (!isUnactive) {
        return (
            <button className={styles.notApproveBtn} onClick={onClick}>
                {text}
            </button>
        )
    } else {
        return (
            <button className={styles.unactiveBtn} onClick={onClick}>
                {text}
            </button>
        )
    }
}
export default Button;