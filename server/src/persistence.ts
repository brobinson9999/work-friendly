import fs from 'fs/promises';
import { timeLogAsync } from './performance.js';

const DATA_FILE = './data.json';
let data: Record<string, JSONObject[]> = {};
const initialLoad = loadData();

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONValue[];

export interface JSONObject {
  [key: string]: JSONValue;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path, fs.constants.F_OK); // F_OK checks for existence
    return true;
  } catch {
    return false;
  }
}

async function loadData(): Promise<void> {
  if (await fileExists(DATA_FILE)) {
    await timeLogAsync('Loading data from file', async () => {
      const fileContents = await fs.readFile(DATA_FILE, 'utf-8');
      data = JSON.parse(fileContents) as Record<
        string,
        Record<string, JSONObject>[]
      >;
    });
  }
}

async function saveDataToFile(): Promise<void> {
  await timeLogAsync('Saving data to file', async () => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  });
}

async function getCollection<TRecord extends JSONObject>(
  collection: string,
): Promise<TRecord[]> {
  await initialLoad;
  let collectionData = data[collection];
  if (!collectionData) {
    collectionData = [];
    data[collection] = collectionData;
  }
  return collectionData as TRecord[];
}

async function withCollection<TRecord extends JSONObject>(
  collection: string,
  callback: (collectionData: TRecord[]) => Promise<void>,
): Promise<void> {
  const collectionData = await getCollection<TRecord>(collection);
  await callback(collectionData);
  await saveDataToFile();
}

export async function getRecords<TRecord extends JSONObject>(
  collection: string,
): Promise<TRecord[]> {
  return getCollection<TRecord>(collection);
}

export async function addRecord<TRecord extends JSONObject>(
  collection: string,
  record: TRecord,
): Promise<void> {
  await withCollection<TRecord>(collection, async (collectionData) => {
    collectionData.push(record);
  });
}

export async function editRecord<TRecord extends JSONObject>(
  collection: string,
  id: string,
  updater: (record: TRecord) => TRecord,
): Promise<void> {
  await withCollection<TRecord>(collection, async (collectionData) => {
    const index = collectionData.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(
        `Record with id ${id} not found in collection ${collection}`,
      );
    }

    collectionData[index] = updater(collectionData[index]!);
  });
}

export async function patchRecord<TRecord extends JSONObject>(
  collection: string,
  id: string,
  record: TRecord,
): Promise<void> {
  await withCollection<TRecord>(collection, async (collectionData) => {
    const index = collectionData.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(
        `Record with id ${id} not found in collection ${collection}`,
      );
    }

    collectionData[index] = { ...collectionData[index], ...record };
  });
}

export async function deleteRecord<TRecord extends JSONObject>(
  collection: string,
  id: string,
): Promise<void> {
  await withCollection<TRecord>(collection, async (collectionData) => {
    const index = collectionData.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(
        `Record with id ${id} not found in collection ${collection}`,
      );
    }

    collectionData.splice(index, 1);
  });
}
