import { ApiProperty } from '@nestjs/swagger';

interface StatisticData {
  count: number;
  revenue: number;
}

export class DayByDay implements StatisticData {
  @ApiProperty({ type: Number })
  day: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  revenue: number;
}

export class MonthByMonth implements StatisticData {
  @ApiProperty({ type: Number })
  month: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  revenue: number;
}

export class YearByYear implements StatisticData {
  @ApiProperty({ type: Number })
  year: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  revenue: number;
}

export class EnumerateResponseDto {
  @ApiProperty({ type: Array })
  data: {
    count: number;
    day?: string | number;
    month?: string | number;
    year?: string | number;
  }[];
}

export class TotalResponseDto {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: String })
  status?: string;
}

export class TotalOrderEachStatusResponseDto {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: String })
  status: string;
}
