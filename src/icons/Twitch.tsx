type Props = {
    size: number;
};

const Twitch = ({ size }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256">
            <path
                fill="currentColor"
                d="M208 28H48a20 20 0 0 0-20 20v144a20 20 0 0 0 20 20h12v28a12 12 0 0 0 19.68 9.22L124.34 212h40.76a20.06 20.06 0 0 0 12.81-4.64l42.89-35.74a19.93 19.93 0 0 0 7.2-15.37V48a20 20 0 0 0-20-20m-4 126.38L163.66 188H120a12 12 0 0 0-7.68 2.78L84 214.38V200a12 12 0 0 0-12-12H52V52h152ZM156 136V88a12 12 0 0 1 24 0v48a12 12 0 0 1-24 0m-48 0V88a12 12 0 0 1 24 0v48a12 12 0 0 1-24 0"
            ></path>
        </svg>
    );
};

export default Twitch;
