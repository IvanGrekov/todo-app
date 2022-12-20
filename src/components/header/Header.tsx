import AddTodoButton from 'components/add-todo-button';
import Typography from 'components/typography';

import 'components/header/Header.styles.scss';

export default function Header(): JSX.Element {
    return (
        <header className="header">
            <Typography element="h1" variant="h1" textAlign="left">
                Todos
            </Typography>

            <AddTodoButton />
        </header>
    );
}
