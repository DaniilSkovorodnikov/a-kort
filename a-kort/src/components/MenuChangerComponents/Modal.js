import {useState} from "react";

export default function Modal({visible, setVisible, children}){
    const classes = ["category-adder"]
    if (visible){
        classes.push("active")
    }



    return (
      <div className={classes.join(' ')} onClick={() => setVisible(false)}>
          {children}
      </div>
    );
}