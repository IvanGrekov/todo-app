import { IBaseIconProps } from 'components/icon/types';
import { COLORS } from 'constants/colors';

export default function IncompleteIcon({ color = COLORS.white }: IBaseIconProps): JSX.Element {
    return (
        <svg viewBox="0 0 32 32" fill={color}>
            <g>
                <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
            </g>
        </svg>
    );
}
