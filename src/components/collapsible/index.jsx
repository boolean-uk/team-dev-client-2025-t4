import { useState } from 'react';
import './style.css';

const Collapsible = (props) => {
    const [open, setOPen] = useState(false);

    const toggle = () => {
        setOPen(!open);
      };

    return (
        <div className="collapsible">
            <button onClick={toggle}>{props.label}</button>
            {open &&
            <div className="toggle">{props.children}</div>
            }
        </div>
    )
};

export default Collapsible;