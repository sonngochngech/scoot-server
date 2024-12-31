import { SERPER_TYPE } from './constants';
import  { AxiosRequestConfig } from 'axios';

require('dotenv').config();
const SERPER_API_KEY = process.env.SERPER_API_KEY as string;

interface SerReqConfig extends AxiosRequestConfig {
  data: string;
}

export const serReq = (type: string, data: string): SerReqConfig => {
  return {
    method: 'post',
    url: `https://google.serper.dev/${type}`,
    headers: {
      'X-API-KEY': SERPER_API_KEY,
      'Content-Type': 'application/json'
    },
    data: data
  };
};

export const ImageReq = (query: string, type: string = SERPER_TYPE.IMAGE): SerReqConfig => {
  const data = JSON.stringify({
    "q": query,
    "num": 10
  });

  return serReq(type, data);
};

export const accommodationReq = (query: string): SerReqConfig => {
  const data = JSON.stringify({
    "q": query
  });

  return serReq(SERPER_TYPE.PLACE, data);
};