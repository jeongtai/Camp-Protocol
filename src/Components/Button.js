import React from "react"
import styles from "./css/Button.module.css"

function Button({text}) {
    return (
        <button className={styles.btn}>
            {text}   
        </button>

    )
}
export default Button;