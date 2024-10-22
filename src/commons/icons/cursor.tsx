import React from "react";

const CursorIcon = ({
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
      <path
        d="M13.3335 23.9997C13.3335 13.6903 21.6908 5.33301 32.0002 5.33301C42.3095 5.33301 50.6668 13.6903 50.6668 23.9997"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3335 23.9997C21.3335 18.109 26.1095 13.333 32.0002 13.333C37.8908 13.333 42.6668 18.109 42.6668 23.9997"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.1443 34.6663V25.333C36.1443 23.125 34.3523 21.333 32.1443 21.333V21.333C29.9363 21.333 28.1443 23.125 28.1443 25.333V31.9997V42.6663L25.7417 40.2637C24.123 38.645 21.499 38.645 19.8803 40.2637V40.2637C18.483 41.661 18.267 43.8503 19.363 45.493L26.5603 56.2903C27.5497 57.7757 29.2163 58.6663 31.0003 58.6663H45.1017C47.7923 58.6663 50.059 56.6637 50.395 53.9943L51.8403 42.429C52.195 39.5837 50.2377 36.965 47.4083 36.5037L36.1443 34.6663Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CursorIcon;
