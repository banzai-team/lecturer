import { UploadedFile } from "src/file/file.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

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

    @Column({
        name: 'lecture_name'
    })
    lectureName: string;

    @OneToOne(t => LectureText, lt => lt.lecture)
    text: Relation<LectureText>;

    @JoinColumn({ name: "file_id" })
    @OneToOne(t => UploadedFile)
    file: Relation<UploadedFile>;

    @OneToOne(t => Glossary, g => g.lecture)
    glossary: Relation<Glossary>;

    @OneToMany(m => LectureTextChunk, m => m.lecture)
    textChunks: Relation<LectureTextChunk[]>;
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

    @JoinColumn({ name: "lecture_id" })
    @OneToOne(l => Lecture, l => l.glossary)
    lecture: Relation<Lecture>;

    @OneToMany(m => GlossaryItem, m => m.glossary)
    items: Relation<GlossaryItem[]>;
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

    @ManyToOne(c => Glossary, c => c.items)
    glossary: Relation<Glossary>;
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

    @Column({
        type: 'text'
    })
    content: string;

    @JoinColumn({ name: "lecture_id" })
    @OneToOne(l => Lecture, l => l.text)
    lecture: Lecture;


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

    @ManyToOne(c => Lecture, c => c.textChunks)
    lecture: Relation<Lecture>;
}