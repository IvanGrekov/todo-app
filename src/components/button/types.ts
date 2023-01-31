export interface IBaseButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    iconColor?: string;
    isDisabled?: boolean;
}
