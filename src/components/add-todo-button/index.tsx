import Button from 'components/button';
import { EIconNames } from 'components/icon';
import { COLORS } from 'constants/colors';

export default function AddTodoButton(): JSX.Element {
    return (
        <Button
            text="Add todo"
            variant="contained"
            textVariant="subtitle2"
            isBig
            title="Add a new todo"
            iconName={EIconNames.ADD}
            iconColor={COLORS.black}
            onClick={(): void => {
                console.log('click');
            }}
        />
    );
}
