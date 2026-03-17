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

  // many images may belong to one property
  @ManyToOne(
    () => Property,
    (property) => property.images,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "propertyId" })
  property!: Relation<Property>;
}
