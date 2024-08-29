import React from "react";

// https://lineicons.com/free-icons/weather-icons
export function Icon( { height = "24px", width = "24px", color = "black" } ) {
    return (
<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L4 21M9.5 20V19M9.5 19V18M9.5 19H10.5M9.5 19H8.5M14.5 18L12.5 21M18 20V19M18 19V18M18 19H19M18 19H17M8.8 15C6.14903 15 4 12.9466 4 10.4137C4 8.31435 5.6 6.375 8 6C8.75283 4.27403 10.5346 3 12.6127 3C15.2747 3 17.4504 4.99072 17.6 7.5C19.0127 8.09561 20 9.55741 20 11.1402C20 13.2719 18.2091 15 16 15L8.8 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
    ) }
