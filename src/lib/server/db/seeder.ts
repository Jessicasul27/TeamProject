import { PropertyStatus, PropertyType } from "$lib/enums";
import { authSeeder } from "../auth";
import { db } from ".";
import type { DeepPartial } from "typeorm";
import type { Property } from "./entities/property";
import type { Customer } from "./entities/customer";

const GENERIC_REVIEWS: { rating: number; comment: string }[] = [
  {
    rating: 5,
    comment:
      "Fantastic stay. Very clean, comfortable, and exactly as described.",
  },
  {
    rating: 5,
    comment:
      "Excellent property in a great location. Would definitely stay again.",
  },
  {
    rating: 4,
    comment:
      "Really enjoyable stay. The place was tidy and had everything we needed.",
  },
  {
    rating: 5,
    comment: "Beautiful property and a smooth experience from start to finish.",
  },
  {
    rating: 4,
    comment:
      "Very nice stay overall. Comfortable beds and a lovely atmosphere.",
  },
  {
    rating: 5,
    comment: "One of the best places we have stayed. Highly recommended.",
  },
  {
    rating: 4,
    comment: "Great value for money and the property matched the photos well.",
  },
  {
    rating: 5,
    comment: "Spacious, clean, and well located. We had a brilliant time.",
  },
];

const CUSTOMERS: UserInput[] = [
  {
    email: "customer@staycraft.ie",
    phoneNumber: "0870870870",
    firstName: "Cus",
    lastName: "Tomer",
  },
  {
    email: "JohnDoe@email.com",
    phoneNumber: "0894791234",
    firstName: "John",
    lastName: "Doe",
  },
  {
    email: "JoshBigWilly@email.com",
    phoneNumber: "0877778990",
    firstName: "Josh",
    lastName: "Wilis",
  },
  {
    email: "Charlton.United@email.com",
    phoneNumber: "0871234567",
    firstName: "Booby",
    lastName: "Charlton",
  },
  {
    email: "Sam_S2005@email.com",
    phoneNumber: "0870976543",
    firstName: "Sam",
    lastName: "Smith",
  },
  {
    email: "MarkoPolo@email.com",
    phoneNumber: "0870998754",
    firstName: "Marko",
    lastName: "Butler",
  },
  {
    email: "Bobby_D@email.com",
    phoneNumber: "0898008420",
    firstName: "Bob",
    lastName: "Dillion",
  },
];

const PROPERTIES: DeepPartial<Property>[] = [
  {
    title: "Bear View Apartment",
    location: "Wicklow",
    type: PropertyType.Apartment,
    pricePerNight: 120,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description: "Beautiful lake view apartment.",
    shortDescription: "Close to ocean",
    displayImage: "/images/properties/bearview.jpg",
  },
  {
    title: "Sea View Apartment",
    location: "Galway",
    type: PropertyType.Apartment,
    pricePerNight: 120,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description: "Beautiful modern apartment overlooking the Atlantic Ocean.",
    shortDescription: "Perfect for couples or small families.",
    displayImage: "/images/properties/seaview.jpg",
  },
  {
    title: "Luxury City Penthouse",
    location: "Dublin",
    type: PropertyType.Other,
    pricePerNight: 350,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description: "Top-floor penthouse in the heart of Dublin city.",
    shortDescription: "Includes private balcony and skyline views.",
    displayImage: "/images/properties/luxurypenthouse.jpg",
  },
  {
    title: "Cozy Country Cottage",
    location: "Donegal",
    type: PropertyType.Cottage,
    pricePerNight: 90,
    maxGuests: 3,
    status: PropertyStatus.Active,
    description: "Traditional Irish cottage surrounded by countryside.",
    shortDescription: "Peaceful and quiet retreat.",
    displayImage: "/images/properties/cozycottage.jpg",
  },
  {
    title: "Modern Townhouse",
    location: "Cork",
    type: PropertyType.Townhouse,
    pricePerNight: 180,
    maxGuests: 6,
    status: PropertyStatus.Inactive,
    description: "Spacious townhouse close to Cork city centre.",
    shortDescription: "Ideal for business stays or family holidays.",
    displayImage: "/images/properties/moderntownhouse.jpg",
  },
  {
    title: "Lakefront Cabin",
    location: "Killarney",
    type: PropertyType.Cabin,
    pricePerNight: 150,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description: "Wooden cabin located directly beside the lake.",
    shortDescription: "Great for hiking and outdoor adventures.",
    displayImage: "/images/properties/lakefrontcabin.jpg",
  },
  {
    title: "Beachside Villa",
    location: "Wexford",
    type: PropertyType.Villa,
    pricePerNight: 400,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description: "Luxury villa steps away from the beach.",
    shortDescription: "Private pool and large garden included.",
    displayImage: "/images/properties/beachsidevilla.jpg",
  },
  {
    title: "City Centre House",
    location: "Dublin",
    type: PropertyType.House,
    pricePerNight: 200,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description: "Modern house in city centre.",
    shortDescription: "Walking distance to shops",
    displayImage: "/images/properties/citycenterhouse.jpg",
  },
];

export async function seed(): Promise<void> {
  // default admin
  const adminUser = await addUser(
    {
      firstName: "Mike",
      lastName: "Oxmall",
      email: "admin@staycraft.ie",
      phoneNumber: "0871111111",
    },
    "password",
  );

  await addAdmin(adminUser.id);

  // default landlord for seeded properties
  const landlordUser = await addUser(
    {
      firstName: "Thomas",
      lastName: "Edison",
      email: "landlord@staycraft.ie",
      phoneNumber: "0870000000",
    },
    "password",
  );

  await addLandlord(landlordUser.id);

  const seededCustomers = [];
  for (const customer of CUSTOMERS) {
    const user = await addUser(customer, "password");
    const seededCustomer = await addCustomer(user.id);
    seededCustomers.push(seededCustomer);
  }

  const seededProperties = [];
  if ((await db.propertyRepo.count()) === 0) {
    for (const property of PROPERTIES) {
      const seededProperty = await addProperty(landlordUser.id, property);
      seededProperties.push(seededProperty);
    }
  }

  await seedReviewsForProperties(seededProperties, seededCustomers);
}

type UserInput = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

async function addUser(input: UserInput, password: string) {
  // Better Auth stores emails in lowercase, which breaks the
  // 'where' check if we don't do it ourselves
  input.email = input.email.toLocaleLowerCase();

  const existingUser = await db.userRepo.findOne({
    where: { email: input.email },
  });

  if (existingUser) {
    return existingUser;
  }

  const result = await authSeeder.api.signUpEmail({
    body: {
      name: `${input.firstName} ${input.lastName}`,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      password: password,
    },
  });

  return await db.userRepo.findOneOrFail({
    where: { id: result.user.id },
  });
}

async function addAdmin(userId: string) {
  const existingAdmin = await db.adminRepo.findOne({
    where: { userId },
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  return await db.adminRepo.save({
    userId,
  });
}

async function addCustomer(userId: string) {
  const existingCustomer = await db.customerRepo.findOne({
    where: { userId },
  });

  if (existingCustomer) {
    return existingCustomer;
  }

  return await db.customerRepo.save({
    userId,
  });
}

async function addLandlord(userId: string) {
  const existingLandlord = await db.landlordRepo.findOne({
    where: { userId },
  });

  if (existingLandlord) {
    return existingLandlord;
  }

  return await db.landlordRepo.save({
    userId,
    incomeShare: 0.7,
  });
}

async function addProperty(landlordId: string, data: DeepPartial<Property>) {
  return await db.propertyRepo.save({
    ...data,
    landlordUserId: landlordId,
  });
}

async function seedReviewsForProperties(
  properties: Property[],
  customers: Customer[],
) {
  const reviewsPerProperty = Math.min(5, customers.length);

  for (
    let propertyIndex = 0;
    propertyIndex < properties.length;
    propertyIndex++
  ) {
    const property = properties[propertyIndex];

    for (let reviewIndex = 0; reviewIndex < reviewsPerProperty; reviewIndex++) {
      const customer =
        customers[(propertyIndex + reviewIndex) % customers.length];
      const template =
        GENERIC_REVIEWS[
          (propertyIndex * reviewsPerProperty + reviewIndex) %
            GENERIC_REVIEWS.length
        ];

      await addReview(
        property.id,
        customer.userId,
        template.rating,
        template.comment,
      );
    }
  }
}

async function addBooking(propertyId: string, customerUserId: string) {
  const property = await db.propertyRepo.findOneOrFail({
    where: { id: propertyId },
  });

  const existingBookingCountForProperty = await db.bookingRepo.count({
    where: { propertyId },
  });

  const lastBookingForProperty = await db.bookingRepo.findOne({
    where: { propertyId },
    order: { checkOutDate: "DESC" },
  });

  const nights = 2 + (existingBookingCountForProperty % 4);

  let checkInDate: Date;

  if (lastBookingForProperty) {
    checkInDate = new Date(lastBookingForProperty.checkOutDate);
    checkInDate.setUTCDate(checkInDate.getUTCDate() + 1); // 1 day gap
    checkInDate.setUTCHours(15, 0, 0, 0);
  } else {
    checkInDate = new Date(Date.UTC(2026, 0, 31, 15, 0, 0, 0));
  }

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setUTCDate(checkOutDate.getUTCDate() + nights);
  checkOutDate.setUTCHours(11, 0, 0, 0);

  const bookedAt = new Date(checkInDate);
  bookedAt.setUTCDate(bookedAt.getUTCDate() - 14);
  bookedAt.setUTCHours(10, 0, 0, 0);

  return await db.bookingRepo.save({
    propertyId,
    customerUserId,
    bookedAt,
    checkInDate,
    checkOutDate,
    bookingPrice: property.pricePerNight * nights,
  });
}

async function getBookingForReview(propertyId: string, customerUserId: string) {
  const existingBookings = await db.bookingRepo.find({
    where: { propertyId, customerUserId },
    order: { checkOutDate: "DESC" },
  });

  for (const booking of existingBookings) {
    const existingReviewForBooking = await db.reviewRepo.findOne({
      where: { bookingId: booking.id },
    });

    if (!existingReviewForBooking) {
      return booking;
    }
  }

  return await addBooking(propertyId, customerUserId);
}

async function addReview(
  propertyId: string,
  customerUserId: string,
  rating: number,
  comment: string,
) {
  const existingReview = await db.reviewRepo.findOne({
    where: { propertyId, customerUserId },
  });

  if (existingReview) {
    return existingReview;
  }

  const booking = await getBookingForReview(propertyId, customerUserId);

  return await db.reviewRepo.save({
    propertyId,
    customerUserId,
    bookingId: booking.id,
    rating,
    comment,
  });
}
