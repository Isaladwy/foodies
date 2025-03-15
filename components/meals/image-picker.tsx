import React from 'react'
import classes from './image-picker.module.css'

export default function ImagePicker({ label }: { label: string }) {
  return (
    <div className={classes.picker}>
      <label>{label}</label>
    </div>
  )
}
