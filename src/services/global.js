import { requestWithoutPrefix } from '@/utils/request';
import config from 'config';

export function getUserInfo(data) {
  return requestWithoutPrefix(
    `${config.BASE_URL}/CompanyUser/GetCurrentUserInfo`,
    'GET',
    data,
  );
}
