import React from "react"
import styles from "./css/Button.module.css"

function Button({ text, isApproved, onClick }) {
    if (isApproved) {
        return (
            <button className={styles.approvedBtn} onClick={onClick}>
                {text}
            </button>
        )
    } else {
        return (
            <button className={styles.notApproveBtn} onClick={onClick}>
                {text}
            </button>
        )

    }
}
export default Button;