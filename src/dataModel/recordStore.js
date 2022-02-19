import AsyncStorage from "@react-native-async-storage/async-storage";
import { json } from "d3";
import moment from "moment";

const store = "@RecordStore";
const formatDate = (date) => moment(date).format("YYYYMMDD");
const formatKey = (date) => `${store}:${formatDate(date)}`;

export const save = async (record) => {
  if (!record.date) {
    throw new Error("No date!");
  }

  try {
    await AsyncStorage.setItem(
      formatKey(record.date),
      JSON.stringify(record),
    );
  } catch (error) {
    throw error;
  }
}

export const get = async (date) => {
  if (!date) {
    throw new Error("No date!");
  }

  try {
    const jsonString = await AsyncStorage.getItem(formatKey(date));
    return JSON.parse(jsonString);
  } catch (error) {
    throw error;
  }
}

export const getRange = async (dateBegin, dateEnd) => {
  if (!dateBegin || !dateEnd || dateEnd < dateBegin) {
    throw new Error("Invalid date range!");
  }

  const allKeys = await AsyncStorage.getAllKeys();
  const beginKey = formatKey(dateBegin);
  const endKey = formatKey(dateEnd);
  const keys = allKeys.filter(key => key >= beginKey && key <= endKey).sort();

  try {
    const jsonStrings = await AsyncStorage.multiGet(keys);
    return jsonStrings.map((j) => JSON.parse(j[1]));
  } catch (error) {
    throw error;
  }
}
