import { Timestamp } from "firebase/firestore";
export default (timestamp: Timestamp) => {
  return timestamp.toDate().toLocaleDateString("hr-HR");
};
