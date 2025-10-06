export interface LocalStorageData {
  [key: string]:
    | string
    | number
    | object
    | LocalStorageData
    | LocalStorageData[];
}
