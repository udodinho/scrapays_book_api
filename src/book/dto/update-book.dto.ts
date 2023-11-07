import { InputType, Field } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class UpdateBookDTO{
    @Field()
	id: number
    @Field({ nullable: true })
    name?: string;
    @Field({ nullable: true })
    description?: string;
}