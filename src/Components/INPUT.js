import React from 'react'
import styles from "./css/Input.module.css"

function Input ({text, value, onChange, type}) {
    return (
        <input
          className={styles.input}
          onChange={onChange}
          value = {value}
          type = {type}
          placeholder={text}>
        </input>
    )
}
export default Input;