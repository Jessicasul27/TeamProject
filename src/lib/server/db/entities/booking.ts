import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Customer } from "./customer";
import { Property } from "./property";

@Entity({ name: "bookings" })
export class Booking {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "datetime" })
	checkInDate!: Date;

	@Column({ type: "datetime" })
	checkOutDate!: Date;

	@Column({ type: "decimal", precision: 18, scale: 2 })
	bookingPrice!: number;

	@Column({ type: "integer" })
	propertyId!: number;

	@ManyToOne(() => Property, (property) => property.bookings, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "propertyId", referencedColumnName: "id" })
	property!: Relation<Property>;

	@Column({ type: "text" })
	customerUserId!: string;

	@ManyToOne(() => Customer, (customer) => customer.bookings, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "customerUserId", referencedColumnName: "userId" })
	customer!: Relation<Customer>;
}
