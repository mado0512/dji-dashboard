export { apiGet, type ApiResponse } from "./client";

// Domain APIs — mock-switcher wrappers
export { getDevices, getAllDevices, GetDeviceList } from "./devices";
export { getUsers, getAllUsers } from "./users";
export { getElements, getAllElements } from "./elements";
export {
  getWaylines,
  getAllWaylines,
  getWaylineDetailSwitched as getWaylineDetail,
} from "./waylines";
export { getTasks, getAllTasks, getStatistics, getTrack, getAllTrack } from "./tasks";
