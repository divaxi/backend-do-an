export enum StatusEnum {
  scheduled = 1, // Đã đặt lịch
  canceled = 2, // Đã hủy
  rescheduled = 3, // Đã dời lịch
  waiting = 4, // Đang chờ khám
  inProgress = 5, // Đang được khám
  completed = 6, // Đã hoàn tất
  noShow = 7, // Không đến
  followUpNeeded = 8, // Cần tái khám
}
