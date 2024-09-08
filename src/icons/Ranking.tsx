type Props = {
    size: number;
};

const Ranking = ({ size }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256">
            <path
                fill="currentColor"
                d="M108.62 103.79a12 12 0 0 1 7.59-15.17l12-4A12 12 0 0 1 144 96v40a12 12 0 0 1-24 0v-24a12 12 0 0 1-11.38-8.21M252 208a12 12 0 0 1-12 12H16a12 12 0 0 1 0-24h4v-92a20 20 0 0 1 20-20h36V56a20 20 0 0 1 20-20h64a20 20 0 0 1 20 20v68h36a20 20 0 0 1 20 20v52h4a12 12 0 0 1 12 12m-72-60v48h32v-48Zm-80 48h56V60h-56Zm-56 0h32v-88H44Z"
            ></path>
        </svg>
    );
};

export default Ranking;
