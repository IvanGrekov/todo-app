import moment from 'moment';

import { DATE_FORMAT } from 'constants/date';

export const formatDate = (date?: string | Date): string =>
    moment(date || new Date()).format(DATE_FORMAT);
