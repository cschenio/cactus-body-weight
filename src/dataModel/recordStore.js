import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const getAll = async () => {

  const allKeys = await AsyncStorage.getAllKeys();
  const keys = allKeys.sort();

  try {
    const jsonStrings = await AsyncStorage.multiGet(keys);
    return jsonStrings.map((j) => JSON.parse(j[1]));
  } catch (error) {
    throw error;
  }
}

// Below is for testing RecordStore.
const GenerateFakeData = async () => {
  const today = new Date()
  for(var i=0; i<100; i++){
    var random_num = Math.random() * 10 - 5;
    await RecordStore.save({
      date: moment(today).subtract(i, "days"),
      weight: 50.0 + i + random_num,
      fat: 25.0 + i * 0.3 + random_num * 0.3,
    });
  }
}