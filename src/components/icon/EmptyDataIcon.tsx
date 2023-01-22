import { IBaseIconProps } from 'components/icon/types';
import { COLORS } from 'constants/colors';

export default function EmptyDataIcon({ color = COLORS.primary }: IBaseIconProps): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill={color} viewBox="0 0 62 62">
            <g>
                <path
                    d="M62,41.6L62,41.6L62,41.6l-8-40C53.8,0.7,53,0,52,0H11c-0.9,0-1.8,0.6-2,1.6l-9,40c0,0.1,0,0.3,0,0.4v18
		c0,1.1,0.9,2,2,2h58c1.1,0,2-0.9,2-2V42C62,41.9,62,41.7,62,41.6z M12.6,4h37.7l7.2,36H40c-1.1,0-2,0.9-2,2c0,2.8-4.2,6.1-7,6.1
		s-7-3.3-7-6.1c0-1.1-0.9-2-2-2H4.5L12.6,4z M58,58H4V44h16.2c0.9,4,6.5,8,10.8,8s9.9-4,10.8-8H58V58z"
                />
            </g>
        </svg>
    );
}
