import { Args, Field, Int, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lecture as LectureEntity } from "./inventory.entity";

@ObjectType()
export class File {
    @Field(type => String)
    id: string

    @Field(type => Date)
    uploadedAt: Date;

    @Field(type => String)
    originalName: string;

    @Field(type => String)
    path: string;
}

@ObjectType()
export class GlossaryItem {
    @Field(type => String)
    id: string

    @Field(type => String)
    term: string;

    @Field(type => String)
    meaning: string;
}

@ObjectType()
export class Glossary {
    @Field(type => String)
    id: string

    @Field(type => Date)
    createdAt: Date;

    @Field(type => [GlossaryItem], { nullable: true })
    items?: [GlossaryItem];
}

@ObjectType()
export class Lecture {
    @Field(type => String)
    id: string;

    @Field({ nullable: false })
    name: string;

    @Field(type => File, { nullable: true })
    file?: File;

    @Field(type => Glossary, { nullable: true })
    glossary?: Glossary;
}



@Resolver(of => Lecture)
export class LectureResolver {
    
    constructor(@InjectRepository(LectureEntity) private readonly lectureRepository: Repository<LectureEntity>) {}

    @Query(returns => Lecture)
    async lecture(@Args('id', { type: () => String }) id: string) {
        const lecture = await this.lectureRepository.findOne({
            where: {
                id
            },
            relations: {
                file: true,
                glossary: {
                    items: true
                },
                textChunks: true,
                text: true
            }
        })
        return lecture;
    }
} 
