import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { Property } from "./property";
import { User } from "./user";

@Entity({ name: "landlords" })
export class Landlord {
  @PrimaryColumn("text")
  userId!: string;

  @OneToOne(
    () => User,
    (user) => user.landlord,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;

  @Column({ type: "decimal", precision: 18, scale: 2 })
  incomeShare!: number;

  @OneToMany(
    () => Property,
    (property) => property.landlord,
  )
  properties!: Relation<Property[]>;
}
