import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  type Relation,
} from "typeorm";
import { Booking } from "./booking";
import { Customer } from "./customer";
import { Property } from "./property";

@Entity({ name: "reviews" })
@Unique(["bookingId"])
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "integer" })
  rating!: number;

  @Column({ type: "text" })
  comment!: string;

  @Column({ type: "text" })
  propertyId!: string;

  @Column({ type: "text" })
  bookingId!: string;

  @Column({ type: "text" })
  customerUserId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  // one customer may have many reviews
  @ManyToOne(
    () => Customer,
    (customer) => customer.reviews,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "customerUserId" })
  customer!: Relation<Customer>;

  // one property may have many reviews
  @ManyToOne(
    () => Property,
    (property) => property.reviews,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "propertyId" })
  property!: Relation<Property>;

  // one booking may have one review
  @OneToOne(() => Booking, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bookingId" })
  booking!: Relation<Booking>;
}
