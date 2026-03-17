import { DataSource, type Repository } from "typeorm";

import { Admin } from "./entities/admin";
import { Booking } from "./entities/booking";
import { Customer } from "./entities/customer";
import { Landlord } from "./entities/landlord";
import { Property } from "./entities/property";
import { PropertyImage } from "./entities/property-image";
import { User } from "./entities/user";
import { Review } from "./entities/review";

export const dataSource = new DataSource({
  type: "better-sqlite3",
  database: "app.db",
  synchronize: true,
  logging: false,
  entities: [
    Admin,
    Booking,
    Customer,
    Landlord,
    Property,
    PropertyImage,
    Review,
    User,
  ],
});

export const db = {
  get adminRepo(): Repository<Admin> {
    return dataSource.getRepository(Admin);
  },

  get bookingRepo(): Repository<Booking> {
    return dataSource.getRepository(Booking);
  },

  get customerRepo(): Repository<Customer> {
    return dataSource.getRepository(Customer);
  },

  get landlordRepo(): Repository<Landlord> {
    return dataSource.getRepository(Landlord);
  },

  get propertyImageRepo(): Repository<PropertyImage> {
    return dataSource.getRepository(PropertyImage);
  },

  get propertyRepo(): Repository<Property> {
    return dataSource.getRepository(Property);
  },

  get reviewRepo(): Repository<Review> {
    return dataSource.getRepository(Review);
  },

  get userRepo(): Repository<User> {
    return dataSource.getRepository(User);
  },
};
