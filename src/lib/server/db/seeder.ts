import { PropertyStatus, PropertyType } from "$lib/enums";
import { dataSource, db } from ".";
import { auth } from "../auth";
import { Admin } from "./entities/admin";
import { Customer } from "./entities/customer";
import { Landlord } from "./entities/landlord";
import { User } from "./entities/user";

export async function seed(): Promise<void> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const { userRepo, adminRepo, customerRepo, landlordRepo, propertyRepo } = db;

  // default admin
  const adminUser = await ensureUser(userRepo, {
    firstName: "Mike",
    lastName: "Oxmall",
    email: "admin@staycraft.ie",
    phoneNumber: "0871111111",
    password: "password",
  });

  await ensureAdmin(adminRepo, adminUser.id);

  // default landlord for seeded properties
  const landlordUser = await ensureUser(userRepo, {
    firstName: "Thomas",
    lastName: "Edison",
    email: "landlord@staycraft.ie",
    phoneNumber: "0870000000",
    password: "password",
  });

  await ensureLandlord(landlordRepo, landlordUser.id);

  // customers
  const customers = [
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

  for (const customer of customers) {
    const user = await ensureUser(userRepo, {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      password: "password",
    });

    await ensureCustomer(customerRepo, user.id);
  }

  // properties
  if ((await propertyRepo.count()) === 0) {
    await propertyRepo.save([
      propertyRepo.create({
        title: "Bear View Apartment",
        location: "Wicklow",
        type: PropertyType.Apartment,
        pricePerNight: 120,
        maxGuests: 4,
        status: PropertyStatus.Active,
        description: "Beautiful lake view apartment.",
        shortDescription: "Close to ocean",
        displayImage: "/images/properties/bearview.jpg",
        landlordUserId: landlordUser.id,
      }),
      propertyRepo.create({
        title: "Sea View Apartment",
        location: "Galway",
        type: PropertyType.Apartment,
        pricePerNight: 120,
        maxGuests: 4,
        status: PropertyStatus.Active,
        description:
          "Beautiful modern apartment overlooking the Atlantic Ocean.",
        shortDescription: "Perfect for couples or small families.",
        displayImage: "/images/properties/seaview.jpg",
        landlordUserId: landlordUser.id,
      }),
      propertyRepo.create({
        title: "Luxury City Penthouse",
        location: "Dublin",
        type: PropertyType.Other,
        pricePerNight: 350,
        maxGuests: 5,
        status: PropertyStatus.Active,
        description: "Top-floor penthouse in the heart of Dublin city.",
        shortDescription: "Includes private balcony and skyline views.",
        displayImage: "/images/properties/luxurypenthouse.jpg",
        landlordUserId: landlordUser.id,
      }),
      propertyRepo.create({
        title: "Cozy Country Cottage",
        location: "Donegal",
        type: PropertyType.Cottage,
        pricePerNight: 90,
        maxGuests: 3,
        status: PropertyStatus.Active,
        description: "Traditional Irish cottage surrounded by countryside.",
        shortDescription: "Peaceful and quiet retreat.",
        displayImage: "/images/properties/cozycottage.jpg",
        landlordUserId: landlordUser.id,
      }),
      propertyRepo.create({
        title: "Modern Townhouse",
        location: "Cork",
        type: PropertyType.Townhouse,
        pricePerNight: 180,
        maxGuests: 6,
        status: PropertyStatus.Inactive,
        description: "Spacious townhouse close to Cork city centre.",
        shortDescription: "Ideal for business stays or family holidays.",
        displayImage: "/images/properties/moderntownhouse.jpg",
        landlordUserId: landlordUser.id,
      }),
      propertyRepo.create({
        title: "Lakefront Cabin",
        location: "Killarney",
        type: PropertyType.Cabin,
        pricePerNight: 150,
        maxGuests: 4,
        status: PropertyStatus.Active,
        description: "Wooden cabin located directly beside the lake.",
        shortDescription: "Great for hiking and outdoor adventures.",
        displayImage: "/images/properties/lakefrontcabin.jpg",
        landlordUserId: landlordUser.id,
      }),
      propertyRepo.create({
        title: "Beachside Villa",
        location: "Wexford",
        type: PropertyType.Villa,
        pricePerNight: 400,
        maxGuests: 8,
        status: PropertyStatus.Active,
        description: "Luxury villa steps away from the beach.",
        shortDescription: "Private pool and large garden included.",
        displayImage: "/images/properties/beachsidevilla.jpg",
        landlordUserId: landlordUser.id,
      }),
      propertyRepo.create({
        title: "City Centre House",
        location: "Dublin",
        type: PropertyType.House,
        pricePerNight: 200,
        maxGuests: 6,
        status: PropertyStatus.Active,
        description: "Modern house in city centre.",
        shortDescription: "Walking distance to shops",
        displayImage: "/images/properties/citycenterhouse.jpg",
        landlordUserId: landlordUser.id,
      }),
    ]);
  }
}

type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

async function ensureUser(
  userRepo: ReturnType<typeof dataSource.getRepository<User>>,
  input: UserInput,
) {
  const existingUser = await userRepo.findOne({
    where: { email: input.email },
  });

  if (existingUser) {
    return existingUser;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: `${input.firstName} ${input.lastName}`,
      email: input.email,
      password: input.password,
      firstName: input.firstName,
      lastName: input.lastName,
    },
  });

  return await userRepo.findOneOrFail({
    where: { id: result.user.id },
  });
}

async function ensureAdmin(
  adminRepo: ReturnType<typeof dataSource.getRepository<Admin>>,
  userId: string,
) {
  const existingAdmin = await adminRepo.findOne({
    where: { userId },
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  const admin = adminRepo.create({
    userId,
  });

  return await adminRepo.save(admin);
}

async function ensureCustomer(
  customerRepo: ReturnType<typeof dataSource.getRepository<Customer>>,
  userId: string,
) {
  const existingCustomer = await customerRepo.findOne({
    where: { userId },
  });

  if (existingCustomer) {
    return existingCustomer;
  }

  const customer = customerRepo.create({
    userId,
  });

  return await customerRepo.save(customer);
}

async function ensureLandlord(
  landlordRepo: ReturnType<typeof dataSource.getRepository<Landlord>>,
  userId: string,
) {
  const existingLandlord = await landlordRepo.findOne({
    where: { userId },
  });

  if (existingLandlord) {
    return existingLandlord;
  }

  const landlord = landlordRepo.create({
    userId,
    incomeShare: 0.7,
  });

  return await landlordRepo.save(landlord);
}
