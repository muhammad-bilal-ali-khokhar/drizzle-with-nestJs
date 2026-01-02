import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Buy milk, bread, and eggs from the store',
  })
  description: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false,
    default: false,
  })
  is_completed?: boolean;
}
