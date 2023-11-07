import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateBookDTO{
    @Field()
    name: string;
    @Field()
    description: string;
}