import { ApiProperty } from '@nestjs/swagger'

export class ResponseDto<T> {
  @ApiProperty({ description: 'Payload of the response' })
  payload: T
  @ApiProperty({ example: 1617826799860 })
  timestamp: number
}
