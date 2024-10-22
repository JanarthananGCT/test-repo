import React from "react";

const MappingIcon = ({
  size = " 64",
  color = "#767676"
}: {
  size?: number | string;
  color?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="46" r="6" stroke={color} strokeWidth="3" />
      <circle cx="46" cy="18" r="6" stroke={color} strokeWidth="3" />
      <rect
        x="40"
        y="40"
        width="12"
        height="12"
        rx="6"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="26.4854"
        y="18"
        width="12"
        height="12"
        rx="1"
        transform="rotate(135 26.4854 18)"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M40 17.9999C25.4998 17.9999 40.0002 46.0002 24 45.9999"
        stroke={color}
        strokeWidth="3"
      />
      <path d="M18 25L18 40" stroke={color} strokeWidth="3" />
      <path d="M46 25L46 41" stroke={color} strokeWidth="3" />
    </svg>
  );
};

export default MappingIcon;
