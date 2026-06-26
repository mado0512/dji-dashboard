import type { Device } from "$lib/types/device";
import { Table } from "./table";

export default class DeviceTable extends Table<Device> {
  protected readonly tableName = "devices";

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS devices (
          id                 SERIAL PRIMARY KEY,
          sn                 VARCHAR(255),
          device_model_class VARCHAR(255),
          device_model_key   VARCHAR(255),
          device_nickname    VARCHAR(255),
          binding_time       BIGINT,
          created_at         TIMESTAMPTZ DEFAULT NOW()
      );`);
    // console.log("devices table ready");
  }
}
