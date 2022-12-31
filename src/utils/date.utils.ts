import moment from 'moment';

import { DATE_FORMAT, DATE_FORMAT_FOR_ERROR_LOGGER } from 'constants/date';

export const formatDate = (date?: string | Date): string =>
    moment(date || new Date()).format(DATE_FORMAT);

export const getDateForErrorLogger = (): string =>
    moment(new Date()).format(DATE_FORMAT_FOR_ERROR_LOGGER);
