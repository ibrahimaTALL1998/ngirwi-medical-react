import dayjs from 'dayjs';

import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';

export const convertDateTimeFromServerToHours = date => (date ? dayjs(date).format("HH:mm:ss") : null);

export const convertDateTimeFromServerToDate = date => (date ? dayjs(date).format("DD/MM/YYYY") : null);

export const convertDateTimeFromServer = date => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? dayjs(date).toDate() : null);

export const displayDefaultDateTime = () => dayjs().startOf('minute').format(APP_LOCAL_DATETIME_FORMAT);
