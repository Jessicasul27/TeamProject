import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Customer } from "./customer";
import { Property } from "./property";
import { Review } from "./review";

@Entity({ name: "bookings" })
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  bookedAt!: Date;

  @Column({ type: "datetime" })
  checkInDate!: Date;

  @Column({ type: "datetime" })
  checkOutDate!: Date;

  @Column({ type: "decimal", precision: 18, scale: 2 })
  bookingPrice!: number;

  @Column({ type: "text" })
  propertyId!: string;

  @Column({ type: "text" })
  customerUserId!: string;

  // many bookings may belong to one property
  @ManyToOne(
    () => Property,
    (property) => property.bookings,
    { onDelete: "RESTRICT" },
  )
  @JoinColumn({ name: "propertyId", referencedColumnName: "id" })
  property!: Relation<Property>;

  // many bookings may belong to one customer
  @ManyToOne(
    () => Customer,
    (customer) => customer.bookings,
    { onDelete: "RESTRICT" },
  )
  @JoinColumn({ name: "customerUserId", referencedColumnName: "userId" })
  customer!: Relation<Customer>;

  // one booking may have one review
  @OneToOne(
    () => Review,
    (review) => review.booking,
  )
  review!: Relation<Review>;
}
