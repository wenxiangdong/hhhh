import "./GradientBackground.css";
import React from 'react';
const GradientBackground: React.FC<React.PropsWithChildren<React.StyleHTMLAttributes>> = ({children, className,...ohter}) => {
    return (<div className={`background ${className || ''}`} {...ohter} >{children}</div>);
}

GradientBackground.defaultProps = {
    children: null,
    style: {},
}

export default GradientBackground;