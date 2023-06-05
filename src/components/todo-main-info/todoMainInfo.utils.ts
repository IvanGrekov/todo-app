import moment from 'moment';

import { DATE_USER_READABLE_FORMAT } from 'constants/date';

export const getUserReadableDate = (date: Date): string =>
    moment(date).format(DATE_USER_READABLE_FORMAT);
