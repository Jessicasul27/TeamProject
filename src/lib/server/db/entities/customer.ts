import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, type Relation } from "typeorm";
import { Booking } from "./booking";
import { User } from "./user";

@Entity({ name: "customers" })
export class Customer {
	@PrimaryColumn("text")
	userId!: string;

	@OneToOne(() => User, (user) => user.customer, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user!: Relation<User>;

	@OneToMany(() => Booking, (booking) => booking.customer)
	bookings!: Relation<Booking[]>;
}
