import { getAllDevices } from "$lib/server/dji/devices";
import { getAllElements } from "$lib/server/dji/elements";
import { getAllUsers } from "$lib/server/dji/users";
import { getAllWaylines } from "$lib/server/dji/waylines";

export async function load({ params }) {
  const group_id = params.group_id;

  const devices = await getAllDevices(group_id);
  const users = await getAllUsers(group_id);
  const waylines = await getAllWaylines(group_id);
  const mapElements = await getAllElements(group_id);
  return { group_id, devices, users, waylines, mapElements };
}
