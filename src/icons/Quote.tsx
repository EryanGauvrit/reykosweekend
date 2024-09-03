import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & { size?: number };

export default function Quote(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 23} height={props.size || 23} viewBox="0 0 16 16" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}
