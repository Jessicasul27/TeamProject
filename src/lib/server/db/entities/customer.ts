import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { Booking } from "./booking";
import { User } from "./user";
import { Review } from "./review";

@Entity({ name: "customers" })
export class Customer {
  @PrimaryColumn("text")
  userId!: string;

  // one customer belongs to one user
  @OneToOne(
    () => User,
    (user) => user.customer,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;

  // one customer may have many bookings
  @OneToMany(
    () => Booking,
    (booking) => booking.customer,
  )
  bookings!: Relation<Booking[]>;

  // one customer may have many reviews
  @OneToMany(
    () => Review,
    (review) => review.customer,
  )
  reviews!: Relation<Review[]>;
}
