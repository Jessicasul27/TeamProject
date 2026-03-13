import { Column, Entity, OneToOne, PrimaryColumn, type Relation } from "typeorm";
import { Admin } from "./admin";
import { Customer } from "./customer";
import { Landlord } from "./landlord";

@Entity({ name: "users" })
export class User {
	@PrimaryColumn("text")
	id!: string;

	@Column({ type: "text", unique: true })
	email!: string;

	@Column({ type: "boolean", default: false })
	emailVerified!: boolean;

	@Column({ type: "text" })
	name!: string;

	@Column({ type: "text", nullable: true })
	image!: string | null;

	@Column({ type: "text" })
	firstName!: string;

	@Column({ type: "text" })
	lastName!: string;

	@Column({ type: "datetime" })
	createdAt!: Date;

	@Column({ type: "datetime" })
	updatedAt!: Date;

	@OneToOne(() => Customer, (customer) => customer.user)
	customer!: Relation<Customer> | null;

	@OneToOne(() => Landlord, (landlord) => landlord.user)
	landlord!: Relation<Landlord> | null;

	@OneToOne(() => Admin, (admin) => admin.user)
	admin!: Relation<Admin> | null;
}
