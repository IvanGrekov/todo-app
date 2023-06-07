import { COLORS } from 'constants/colors';

type TGetTextColorByStatus = (completed: boolean) => string;

export const getTextColorByStatus: TGetTextColorByStatus = (completed) => {
    return completed ? COLORS.blackOpacity : COLORS.black;
};
