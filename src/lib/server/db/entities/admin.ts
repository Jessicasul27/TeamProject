import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { User } from "./user";

@Entity({ name: "admins" })
export class Admin {
  @PrimaryColumn("text")
  userId!: string;

  // one admin belongs to one user
  @OneToOne(
    () => User,
    (user) => user.admin,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;
}
