import CompleteButton from 'components/todo-item/CompleteButton';
import { getUserReadableDate } from 'components/todo-main-info/todoMainInfo.utils';
import Typography from 'components/typography';
import { COLORS } from 'constants/colors';
import { ITodo } from 'models/types/todo';
import { getTextColorByStatus } from 'utils/todo.utils';

import 'components/todo-main-info/TodoMainInfo.styles.scss';

interface ITodoMainInfoProps {
    todo: ITodo;
    setIsLoading: (value: boolean) => void;
    shouldShowDate?: boolean;
}

export default function TodoMainInfo({
    todo,
    setIsLoading,
    shouldShowDate = true,
}: ITodoMainInfoProps): JSX.Element {
    const { date, isCompleted, title } = todo;
    const dateObjectFormat = new Date(date);
    const textColor = getTextColorByStatus(isCompleted);

    return (
        <div className="todo-main-info">
            <CompleteButton todo={todo} setIsLoading={setIsLoading} />

            <div className="todo-main-info__title-wrapper">
                <Typography variant="subtitle1" color={textColor}>
                    {title}
                </Typography>

                {shouldShowDate && (
                    <Typography variant="body2" color={COLORS.blackOpacity}>
                        {getUserReadableDate(dateObjectFormat)}
                    </Typography>
                )}
            </div>
        </div>
    );
}
