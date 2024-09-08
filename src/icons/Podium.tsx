type Props = {
    size: number;
};

const Podium = ({ size }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="m12 7.09l2.45 1.49l-.65-2.81L16 3.89l-2.89-.25L12 1l-1.13 2.64L8 3.89l2.18 1.88l-.68 2.81zm-8 6l2.45 1.49l-.65-2.81L8 9.89l-2.89-.25L4 7L2.87 9.64L0 9.89l2.18 1.88l-.68 2.81zm16-3l2.45 1.49l-.65-2.81L24 6.89l-2.89-.25L20 4l-1.13 2.64l-2.87.25l2.18 1.88l-.68 2.81zM15 23H9V10h6zm-8 0H1v-6h6zm16 0h-6V13h6z"
            ></path>
        </svg>
    );
};

export default Podium;
