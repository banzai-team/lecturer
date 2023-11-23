import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'lecture'
})
export class Lecture {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: 'created_at',
        type: 'timestamp with time zone',
        nullable: false
    })
    createdAt: Date;
}

@Entity({
    name: 'uploaded_file'
})
export class UploadedFile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: 'uploaded_at',
        type: 'timestamp with time zone',
        nullable: false
    })
    uploadedAt: Date;

    @Column({
        nullable: false
    })
    path: string;
}

@Entity({
    name: 'glossary'
})
export class Glossary {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: 'uploaded_at',
        type: 'timestamp with time zone',
        nullable: false
    })
    createdAt: Date;
}

@Entity({
    name: 'gloassary_item'
})
export class GlossaryItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    term: string;

    @Column()
    meaning: string;
}

@Entity({
    name: 'lecture_text'
})
export class LectureText {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: 'uploaded_at',
        type: 'timestamp with time zone',
        nullable: false
    })
    createdAt: Date;

    @Column()
    content: string;
}

@Entity({
    name: 'lecture_text_chunk'
})
export class LectureTextChunk {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    content: string;


    @Column({
        type: 'int'
    })
    order: number;

    @Column({
        type: 'int'
    })
    from: number;
    
    @Column({
        type: 'int'
    })
    to: number;
}