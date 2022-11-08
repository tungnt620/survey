import PocketBase from 'pocketbase';
import {toastStore} from "../store/toast.js";
const client = new PocketBase('http://127.0.0.1:8090');

client.records.getList('myCollection').then((records) => {
  console.log(records);
}).catch((error) => {
  toastStore.value = {
    message: error.message,
    type: "error",
  };
});

export const saveAnswer = async (answer) => {
  try {
    const result = await client.records.create('answer', answer);
    console.log('Result:', result);
  } catch (error) {
    console.log('Error:', error);

    toastStore.value = {
      message: error.message,
      type: 'error',
    }
  }
}
