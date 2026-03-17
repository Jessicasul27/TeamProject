import type { PropertyStatus, PropertyType } from "$lib/enums";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Booking } from "./booking";
import { Landlord } from "./landlord";
import { PropertyImage } from "./property-image";
import { Review } from "./review";

@Entity({ name: "properties" })
export class Property {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  shortDescription!: string;

  @Column({ type: "text" })
  location!: string;

  @Column({ type: "decimal", precision: 18, scale: 2 })
  pricePerNight!: number;

  @Column({ type: "integer" })
  maxGuests!: number;

  @Column({ type: "text" })
  type!: PropertyType;

  @Column({ type: "text" })
  status!: PropertyStatus;

  @Column({ type: "text" })
  displayImage!: string;

  @Column({ type: "text" })
  landlordUserId!: string;

  // many properties may belong to one landlord
  @ManyToOne(
    () => Landlord,
    (landlord) => landlord.properties,
    { onDelete: "RESTRICT" },
  )
  @JoinColumn({ name: "landlordUserId" })
  landlord!: Relation<Landlord>;

  // one property may have many images
  @OneToMany(
    () => PropertyImage,
    (image) => image.property,
  )
  images!: Relation<PropertyImage[]>;

  // one property may have many bookings
  @OneToMany(
    () => Booking,
    (booking) => booking.property,
  )
  bookings!: Relation<Booking[]>;

  // one property may have many reviews
  @OneToMany(
    () => Review,
    (review) => review.property,
  )
  reviews!: Relation<Review[]>;
}
