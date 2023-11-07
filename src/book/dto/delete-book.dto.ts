import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class DeleteBookDTO {
    @Field()
	id: number
}