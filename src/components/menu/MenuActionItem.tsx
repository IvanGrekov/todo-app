import Button, { IButtonProps } from 'components/button';

export type TMenuActionItemProps = Pick<
    IButtonProps,
    'text' | 'onClick' | 'iconName' | 'iconColor' | 'title'
>;

export default function MenuActionItem({
    text,
    onClick,
    title,
    iconName,
    iconColor,
}: TMenuActionItemProps): JSX.Element {
    return (
        <Button
            text={text}
            onClick={onClick}
            title={title}
            variant="ghost"
            size="small"
            iconName={iconName}
            iconColor={iconColor}
            style={{
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
            }}
        />
    );
}
