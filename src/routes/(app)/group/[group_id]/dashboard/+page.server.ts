import { GetDeviceList } from "$lib/server/dji/devices";
import { getUsers } from "$lib/server/dji/users";
import { DeviceTable } from "$lib/server/db";

const dt = new DeviceTable();

export async function load({ params }) {
  await dt.init();
  const { list: devices } = await GetDeviceList(params.group_id);
  await dt.insert(devices);
  const all_devices = await dt.selectAll();

  const { list: users } = await getUsers(params.group_id);

  return { group_id: params.group_id, all_devices, users };
}
