export interface Device {
  /** 本地 DB 主键（SERIAL） */
  id?: number;
  /** 设备 SN，全球唯一 */
  sn?: string;
  /** 设备昵称 */
  device_nickname?: string;
  /** 设备绑定时间，13 位时间戳 */
  binding_time?: number;
  /** 设备型号 */
  device_model_key?: string;
  /** 设备类型（飞机 / 遥控器） */
  device_model_class?: string;
  /** 本地 DB 入库时间 */
  created_at?: string;
}

export interface GetDevicesResult {
  list: Device[];
}
