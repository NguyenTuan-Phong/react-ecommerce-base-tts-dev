import { post, get, remove, update } from "../config/axios-config";
import { API_PATHS } from "../constants/apiPath";

// Interface chuẩn backend
export interface SiteSetting {
  settingKey: string;
  settingValue: string;
  description?: string;
}

// Create
export const CreateSiteSetting = (payload: SiteSetting) => {
  return post({
    url: API_PATHS.SITE_SETTING.create,
    data: payload,
  });
};

// Update
export const UpdateSiteSetting = (payload: SiteSetting) => {
  return update({
    url: API_PATHS.SITE_SETTING.update,
    data: payload,
  });
};

// Delete
export const DeleteSiteSetting = (settingKey: string) => {
  return remove({
    url: `${API_PATHS.SITE_SETTING.delete}?key=${settingKey}`,
  });
};

// Get all
export const GetAllIdSiteSetting = (page = 0, size = 10) => {
  return get<{ items: SiteSetting[]; total: number }>({
    url: API_PATHS.SITE_SETTING.getAll,
    params: { page, size },
  });
};

// Get by id
export const GetByIdSiteSetting = (key: string) => {
  return get<SiteSetting>({
    url: `${API_PATHS.SITE_SETTING.getById}?key=${key}`,
  });
};

// Get by ids
export const GetByIdsSiteSetting = (keys: string[]) => {
  return post<SiteSetting[]>({
    url: API_PATHS.SITE_SETTING.getByIds,
    data: keys,
  });
};
