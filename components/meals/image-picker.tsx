import React from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
        />
      </div>
    </div>
  );
}
