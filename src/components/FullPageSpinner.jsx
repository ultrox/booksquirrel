/* eslint-disable no-return-assign */
import React from "react";

function FullPageSpinner() {
  const [show, setShow] = React.useState(false);
  const DELAY = 300;

  React.useEffect(() => {
    let current = true;
    setTimeout(() => {
      if (current) {
        setShow(true);
      }
    }, DELAY);
    return () => (current = false);
  }, [show]);

  return show ? <p>Loading</p> : null;
}

export default FullPageSpinner;
