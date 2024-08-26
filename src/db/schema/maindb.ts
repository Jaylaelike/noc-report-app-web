import { sql } from "drizzle-orm";
import { bigint, datetime, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

//user id should be varchar 255

//for this data field

// ID	Site	Facility Provider	Engineering Center	Posting Date	Downtime Start	Downtime End	Downtime Total	Detail	Job Tickets	Reporter	Approver	Remark
// 2	กรุงเทพ	ส.ส.ท. (ไทยพีบีเอส)	กรุงเทพ	11/24/20 0:00	12/30/99 1:44	12/30/99 1:49	00:04:30	เครื่องส่งโทรทัศน์ภาคพื้นดินในระบบดิจิตอล ชุด Main และ Backup ของสถานีกรุงเทพฯ (ใบหยก2) เกิด Alarm   เจ้าหน้าที่ประจำสถานีฯ ทำการ Reset Alarm ที่หน้าเครื่องส่งฯ ชุด Main และ Backup จึงสามารถออกอากาศได้ปกติ	NOC-NOC -201124001	นาย อมร ศรีแก้ว	นาย สุทัย วินิจชัย
// 3	"ศรีสะเกษ
// "	บมจ. อสมท	สุรินทร์	3/11/21 0:00	12/30/99 12:16	12/30/99 12:19	00:03:22	 สาเหตุไฟฟ้าส่วนภูมิภาคดับ อุปกรณ์ ATS ไม่สลับไปใช้ไฟฟ้าจากเครื่องกำเนิดไฟฟ้าสำรอง แล้วอุปกรณ์ UPS จ่ายไฟฟ้าจนแบตเตอรี่หมด	SRN-SEK-210311009	นาย สุนทร แพรสี	นาย อมร ศรีแก้ว
// 4	กรุงเทพ	ส.ส.ท. (ไทยพีบีเอส)	กรุงเทพ	4/4/21 0:00	12/30/99 13:58	12/30/99 13:59	00:00:17	"สถานีกรุงเทพฯ อาคารใบหยก 2 ออกอากาศขัดข้อง วันที่ 4 เมษายน 2564 เวลา 13:58:58 น. - 13:59:15 น. รวม 17 วินาที (ตรวจสอบจาก DVR) สาเหตุเกิดจากฟ้าผ่า
// "	BKT-BKT -210405009	นาย ชินณัฐ วัฒนคุโณปการ	นาย สุนทร แพรสี	"
// "

export const users = mysqlTable("maindbs", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  Site: varchar("Site", { length: 255 }).notNull(),
  FacilityProvider: varchar("FacilityProvider", { length: 255 }).notNull(),
  EngineeringCenter: varchar("EngineeringCenter", { length: 255 }).notNull(),
  PostingDate: datetime("PostingDate").notNull(),
  DowntimeStart: datetime("DowntimeStart").notNull(),
  DowntimeEnd: datetime("DowntimeEnd").notNull(),
  DowntimeTotal: varchar("DowntimeTotal", { length: 255 }).notNull(),
  Detail: text("Detail").notNull(),
  JobTickets: varchar("JobTickets", { length: 255 }).notNull(),
  Reporter: varchar("Reporter", { length: 255 }).notNull(),
  Approver: varchar("Approver", { length: 255 }).notNull(),
  Remark: text("Remark").notNull(),
  createdAt: datetime("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: datetime("updatedAt"),
});
