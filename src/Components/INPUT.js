import React from 'react'
import styles from "./css/Input.module.css"

function Input ({text}) {
    return (
        <input
          className={styles.input}
          placeholder={text}>
        </input>
    )
}
export default Input;