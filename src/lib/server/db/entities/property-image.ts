import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Property } from "./property";

@Entity({ name: "propertyImages" })
export class PropertyImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  imageUrl!: string;

  @Column({ type: "text" })
  propertyId!: string;

  @ManyToOne(
    () => Property,
    (property) => property.images,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "propertyId" })
  property!: Relation<Property>;
}
