import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(t => LectureText, lt => lt.lecture)
    text: LectureText;

    @OneToOne(t => UploadedFile, lt => lt.lecture)
    file: UploadedFile;

    @OneToOne(t => Glossary, g => g.lecture)
    glossary: Glossary;
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

    @OneToOne(l => Lecture, l => l.file)
    lecture: Lecture;
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

    @OneToOne(l => Lecture, l => l.glossary)
    lecture: Lecture;

    @OneToMany(m => GlossaryItem, m => m.glossary)
    items: GlossaryItem[];
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
    glossary: Glossary;
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

    @OneToOne(l => Lecture, l => l.text)
    lecture: Lecture;

    @OneToMany(m => LectureTextChunk, m => m.lectureText)
    textChunks: LectureTextChunk[];
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

    @ManyToOne(c => LectureText, c => c.textChunks)
    lectureText: LectureText;
}