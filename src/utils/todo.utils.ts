import { COLORS } from 'constants/colors';

type TGetTextColorByStatus = (isCompleted: boolean) => string;

export const getTextColorByStatus: TGetTextColorByStatus = (isCompleted) => {
    return isCompleted ? COLORS.blackOpacity : COLORS.black;
};
