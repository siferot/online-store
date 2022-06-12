import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const createRate = async (rate, userId, deviceId) => {
  const { data } = await $host.post("api/rate", {
    rating: rate,
    userId,
    deviceId,
  });
  return data;
};

export const fetchRate = async (userId, deviceId) => {
  const { data } = await $host.get("api/rate", {
    params: {
      userId,
      deviceId,
    },
  });
  return data;
};

export const addBasketDevice = async (userId, deviceId) => {
  const { data } = await $authHost.post("api/basket/add", {
    params: {
      userId,
      deviceId,
    },
  });
  return data;
};

export const updateBasketDeviceQuantity = async (id, quantity) => {
  const { data } = await $authHost.post("api/basket/update", {
    params: {
      id,
      quantity,
    },
  });
  return data;
};

export const deleteBasketDevice = async (id) => {
  const { data } = await $authHost.post("api/basket/remove", {
    params: {
      id,
    },
  });
  return data;
};

export const fetchBasket = async (userId) => {
  const { data } = await $authHost.get("api/basket/", {
    params: {
      userId,
    },
  });
  return data;
};
