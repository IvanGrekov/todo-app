import { IBaseIconProps } from 'components/icon/types';
import { COLORS } from 'constants/colors';

export default function ErrorIcon({ color = COLORS.primary }: IBaseIconProps): JSX.Element {
    return (
        <svg
            fill={color}
            version="1.1"
            viewBox="0 0 15.618 15.618"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7.809,0L0,15.618h15.618L7.809,0z M7.809,2.236L14,14.618H1.618L7.809,2.236z" />
            <rect height="4" width="1" x="7.309" y="6.118" />
            <rect height="2" width="1" x="7.309" y="11.118" />
        </svg>
    );
}
