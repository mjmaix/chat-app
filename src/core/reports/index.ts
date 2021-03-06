// tslint:disable no-console
export const logError = (...err: any[]) => console.error(err);
export const logRecord = (...err: any[]) => console.log('[REPORT]', err);
export const logInfo = (...data: any[]) => console.log(data);
