
export default function Modal({visible, setVisible, children}){
    const classes = ["modal"]
    if (visible){
        classes.push("active")
    }

    return (
      <div className={classes.join(' ')} onClick={() => {
          if (setVisible)
            setVisible(false)
      }}>
          {children}
      </div>
    );
}