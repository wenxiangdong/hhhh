import React from "react";
import GradientBackground from "./GradientBackground";
const ShiningText: React.FC<React.PropsWithChildren<React.HtmlHTMLAttributes>> = ({children, style, ...other}) => {
    return (
        <GradientBackground style={{
            ...style,
            backgroundClip: 'text',
            color: 'transparent',
            }} {...other}>
            {children}
        </GradientBackground>
    );
}

export default ShiningText;