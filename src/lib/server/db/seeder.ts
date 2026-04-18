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
    image: "/images/avatars/avatar-01.png",
  },
  {
    email: "JohnDoe@email.com",
    phoneNumber: "0894791234",
    firstName: "John",
    lastName: "Doe",
    image: "/images/avatars/avatar-02.png",
  },
  {
    email: "JoshBigWilly@email.com",
    phoneNumber: "0877778990",
    firstName: "Josh",
    lastName: "Wilis",
    image: "/images/avatars/avatar-03.png",
  },
  {
    email: "Charlton.United@email.com",
    phoneNumber: "0871234567",
    firstName: "Booby",
    lastName: "Charlton",
    image: "/images/avatars/avatar-04.png",
  },
  {
    email: "Sam_S2005@email.com",
    phoneNumber: "0870976543",
    firstName: "Sam",
    lastName: "Smith",
    image: "/images/avatars/avatar-05.png",
  },
  {
    email: "MarkoPolo@email.com",
    phoneNumber: "0870998754",
    firstName: "Marko",
    lastName: "Butler",
    image: "/images/avatars/avatar-06.png",
  },
  {
    email: "Bobby_D@email.com",
    phoneNumber: "0898008420",
    firstName: "Bob",
    lastName: "Dillion",
    image: "/images/avatars/avatar-07.png",
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
  {
    title: "Cliffside Bungalow",
    location: "Tipperary",
    type: PropertyType.Bungalow,
    pricePerNight: 130,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description: "Stunning bungalow with cliffside views.",
    shortDescription: "Perfect for a peaceful getaway.",
    displayImage: "/images/properties/amazingBungalow.jpg",
  },
  {
    title: "Historic Castle Stay",
    location: "Limerick",
    type: PropertyType.Other,
    pricePerNight: 500,
    maxGuests: 10,
    status: PropertyStatus.Active,
    description: "Experience life in a historic Irish castle.",
    shortDescription: "Unique and unforgettable stay.",
    displayImage: "/images/properties/rusticCastleOther.jpg",
  },
  {
    title: "Modern Loft Apartment",
    location: "Galway",
    type: PropertyType.Loft,
    pricePerNight: 160,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description: "Contemporary loft apartment in the heart of Galway.",
    shortDescription: "Spacious and well-designed space.",
    displayImage: "/images/properties/smallLoft.jpg",
  },
  {
    title: "Charming Studio Flat",
    location: "Cork",
    type: PropertyType.Studio,
    pricePerNight: 100,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description: "Cozy studio flat in a charming Cork neighborhood.",
    shortDescription: "Ideal for solo travelers or couples.",
    displayImage: "/images/properties/luxuryStudio.jpg",
  },
  {
    title: "Spacious Family Home",
    location: "Dublin",
    type: PropertyType.House,
    pricePerNight: 220,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description: "Large family home with a garden in Dublin suburbs.",
    shortDescription: "Great for families or groups.",
    displayImage: "/images/properties/landscapeHouse.jpg",
  },
  {
    title: "Secluded Forest Luxury House",
    location: "Wicklow",
    type: PropertyType.House,
    pricePerNight: 300,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description: "Luxury house nestled in a secluded forest setting.",
    shortDescription: "Perfect for nature lovers seeking privacy.",
    displayImage: "/images/properties/luxuryHouse.jpg",
  },
  {
    title: "Coastal Cliffside House",
    location: "Clare",
    type: PropertyType.House,
    pricePerNight: 250,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Beautiful house perched on coastal cliffs with stunning ocean views.",
    shortDescription: "Ideal for a romantic getaway or small group.",
    displayImage: "/images/properties/americanHouse.jpg",
  },
  {
    title: "Modern Eco-Friendly Loft",
    location: "Dublin",
    type: PropertyType.Loft,
    pricePerNight: 180,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Sustainable loft apartment with modern amenities in Dublin city centre.",
    shortDescription: "Eco-conscious stay without sacrificing comfort.",
    displayImage: "/images/properties/architectLoft.jpg",
  },
  {
    title: "Rustic Countryside Studio",
    location: "Kerry",
    type: PropertyType.Studio,
    pricePerNight: 80,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description:
      "Charming studio in a rustic countryside setting, perfect for a quiet retreat.",
    shortDescription:
      "Ideal for solo travelers or couples seeking tranquility.",
    displayImage: "/images/properties/artsyStudio.jpg",
  },
  {
    title: "Luxury Bohemian Villa",
    location: "Galway",
    type: PropertyType.Villa,
    pricePerNight: 450,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "Eclectic and luxurious villa with bohemian decor, perfect for a unique stay in Galway.",
    shortDescription: "Spacious and stylish with a private pool.",
    displayImage: "/images/properties/bahamaVilla.jpg",
  },
  {
    title: "Chic Urban House",
    location: "Down",
    type: PropertyType.House,
    pricePerNight: 200,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Stylish and modern house located in a vibrant urban area, close to shops and restaurants.",
    shortDescription: "Great for city breaks and exploring local culture.",
    displayImage: "/images/properties/barbieMovieHouse.jpg",
  },
  {
    title: "Tranquil Lakeside Villa",
    location: "Donegal",
    type: PropertyType.Villa,
    pricePerNight: 350,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "Serene villa overlooking a peaceful lake, perfect for a relaxing getaway.",
    shortDescription: "Idyllic setting for a tranquil retreat.",
    displayImage: "/images/properties/barbieMovieVilla.jpg",
  },
  {
    title: "Beautiful Countryside Bungalow",
    location: "Mayo",
    type: PropertyType.Bungalow,
    pricePerNight: 110,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Charming bungalow surrounded by beautiful countryside, ideal for a peaceful escape.",
    shortDescription: "Cozy and comfortable with lovely garden views.",
    displayImage: "/images/properties/beautifulBungalow.jpg",
  },
  {
    title: "Elegant Historic Castle",
    location: "Limerick",
    type: PropertyType.Other,
    pricePerNight: 550,
    maxGuests: 10,
    status: PropertyStatus.Active,
    description:
      "Experience the grandeur of an elegant historic castle, complete with period furnishings and stunning grounds.",
    shortDescription: "A truly unique and unforgettable stay.",
    displayImage: "/images/properties/beautifulCastleOther.jpg",
  },
  {
    title: "Homestyle Suburban Cottage",
    location: "Cork",
    type: PropertyType.Cottage,
    pricePerNight: 90,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Cozy cottage in a quiet suburban neighborhood, perfect for a homestyle stay with easy access to city amenities.",
    shortDescription: "Comfortable and convenient for exploring Cork.",
    displayImage: "/images/properties/beautifulCottage.jpg",
  },
  {
    title: "Stylish Downtown Lighthouse",
    location: "Dublin",
    type: PropertyType.Other,
    pricePerNight: 400,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Unique and stylish lighthouse located in downtown Dublin, offering stunning views and a memorable stay.",
    shortDescription: "A one-of-a-kind experience in the heart of the city.",
    displayImage: "/images/properties/beautifulLighthouseOther.jpg",
  },
  {
    title: "Breathtaking Seaside Boathouse",
    location: "Waterford",
    type: PropertyType.Other,
    pricePerNight: 300,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Cute and charming boathouse located on the coast, perfect for a romantic getaway.",
    shortDescription: "A delightful spot for a peaceful coastal retreat.",
    displayImage: "/images/properties/breathTakingBoathouse.jpg",
  },
  {
    title: "Chalet Style Mountain Bungalow",
    location: "Wicklow",
    type: PropertyType.Bungalow,
    pricePerNight: 140,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Cozy chalet-style bungalow nestled in the mountains, ideal for a nature-filled escape.",
    shortDescription: "A charming retreat with stunning mountain views.",
    displayImage: "/images/properties/chaletBungalow.jpg",
  },
  {
    title: "Contemporary Artistic Cottage",
    location: "Galway",
    type: PropertyType.Cottage,
    pricePerNight: 130,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Unique cottage with contemporary artistic design, perfect for a creative and inspiring stay in Galway.",
    shortDescription: "A visually stunning and memorable accommodation.",
    displayImage: "/images/properties/champagneCottage.jpg",
  },
  {
    title: "Charming Vintage Lighthouse",
    location: "Clare",
    type: PropertyType.Other,
    pricePerNight: 350,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Charming vintage lighthouse with rustic decor, offering a cozy and romantic stay with beautiful coastal views.",
    shortDescription: "A unique and enchanting experience by the sea.",
    displayImage: "/images/properties/charmingLighthouseOther.jpg",
  },
  {
    title: "Colourful Artistic Townhouse",
    location: "Dublin",
    type: PropertyType.Townhouse,
    pricePerNight: 200,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Vibrant and artistic townhouse filled with colorful decor, perfect for a lively and creative stay in Dublin.",
    shortDescription: "A fun and inspiring place to stay in the city.",
    displayImage: "/images/properties/colourfulTownhouse.jpg",
  },
  {
    title: "Chic Minimalist House",
    location: "Cork",
    type: PropertyType.House,
    pricePerNight: 180,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Sleek and minimalist house with modern design, ideal for a stylish and comfortable stay in Cork.",
    shortDescription: "A contemporary retreat with all the amenities.",
    displayImage: "/images/properties/comesWithACarHouse.jpg",
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
    displayImage: "/images/properties/countryCottage.jpg",
  },
  {
    title: "Cozy Oceanfront Boathouse",
    location: "Wexford",
    type: PropertyType.Other,
    pricePerNight: 250,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Cozy boathouse with direct ocean access, perfect for a relaxing seaside getaway.",
    shortDescription: "A peaceful retreat with stunning ocean views.",
    displayImage: "/images/properties/cozyBoathouseOther.jpg",
  },
  {
    title: "Picturesque Pristine Forest Bungalow",
    location: "Wicklow",
    type: PropertyType.Bungalow,
    pricePerNight: 150,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Charming bungalow nestled in a picturesque and pristine forest setting, ideal for a tranquil escape surrounded by nature.",
    shortDescription: "A serene retreat for nature lovers.",
    displayImage: "/images/properties/cozyBungalow.jpg",
  },
  {
    title: "Contemporary Opulent Studio",
    location: "Dublin",
    type: PropertyType.Studio,
    pricePerNight: 120,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description:
      "Luxurious and contemporary studio apartment with opulent decor, perfect for a stylish and indulgent stay in Dublin.",
    shortDescription: "A chic and lavish urban retreat.",
    displayImage: "/images/properties/cozyStudio.jpg",
  },
  {
    title: "Peaceful Charming Townhouse",
    location: "Galway",
    type: PropertyType.Townhouse,
    pricePerNight: 160,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Charming townhouse in a peaceful neighborhood, ideal for a relaxing stay while exploring Galway.",
    shortDescription: "A cozy and inviting home away from home.",
    displayImage: "/images/properties/cozyTownhouse.jpg",
  },
  {
    title: "Newly Renovated Modern Duplex",
    location: "Cork",
    type: PropertyType.Duplex,
    pricePerNight: 220,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Newly renovated duplex with modern design and amenities, perfect for a comfortable and stylish stay in Cork.",
    shortDescription: "A contemporary and spacious accommodation.",
    displayImage: "/images/properties/cubedDuplex.jpg",
  },
  {
    title: "Twilight Secluded Forest Cabin",
    location: "Kerry",
    type: PropertyType.Cabin,
    pricePerNight: 140,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Cozy cabin nestled in a secluded forest setting, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription: "A tranquil retreat for nature lovers.",
    displayImage: "/images/properties/cullenCabin.jpg",
  },
  {
    title: "Urban Traditional Cottage",
    location: "Down",
    type: PropertyType.Cottage,
    pricePerNight: 110,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Charming traditional cottage located in an urban area, offering a cozy and convenient stay with easy access to city amenities.",
    shortDescription:
      "A delightful blend of rustic charm and city convenience.",
    displayImage: "/images/properties/cuteCottage.jpg",
  },
  {
    title: "Delightful Glamping Dome",
    location: "Laois",
    type: PropertyType.Other,
    pricePerNight: 130,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Unique and delightful glamping dome located in a scenic area, perfect for a fun and memorable outdoor stay with a touch of luxury.",
    shortDescription: "A one-of-a-kind glamping experience in nature.",
    displayImage: "/images/properties/cuteOther.jpg",
  },
  {
    title: "Dreamy Seaside Studio",
    location: "Offaly",
    type: PropertyType.Studio,
    pricePerNight: 120,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description:
      "Charming seaside studio with dreamy ocean views, perfect for a romantic getaway or solo retreat by the sea.",
    shortDescription: "A cozy and picturesque coastal escape.",
    displayImage: "/images/properties/dreamyStudio.jpg",
  },
  {
    title: "Dual Occupancy Modern Townhouse",
    location: "Offaly",
    type: PropertyType.Townhouse,
    pricePerNight: 180,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Spacious and modern townhouse designed for dual occupancy, ideal for two families or groups traveling together while maintaining privacy and comfort.",
    shortDescription:
      "A versatile and contemporary accommodation for larger groups.",
    displayImage: "/images/properties/dualOccupancyTownhouse.jpg",
  },
  {
    title: "Enchanting Secluded Forest Cottage",
    location: "Kildare",
    type: PropertyType.Cottage,
    pricePerNight: 130,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Charming and enchanting cottage nestled in a secluded forest setting, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription: "A magical retreat for nature lovers.",
    displayImage: "/images/properties/englishCottage.jpg",
  },
  {
    title: "Elegant Luxurious Villa",
    location: "Kildare",
    type: PropertyType.Villa,
    pricePerNight: 400,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "Elegant and luxurious villa with stunning design and high-end amenities, perfect for a lavish and unforgettable stay in Louth.",
    shortDescription:
      "A sophisticated and opulent retreat for discerning travelers.",
    displayImage: "/images/properties/exteriorLuxuryVilla.jpg",
  },
  {
    title: "Exlusive Extravagent Bubble Dome",
    location: "Louth",
    type: PropertyType.Other,
    pricePerNight: 350,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Exclusive and extravagant bubble dome located in a scenic area, perfect for a unique and memorable glamping experience with a touch of luxury.",
    shortDescription: "A one-of-a-kind glamping experience in nature.",
    displayImage: "/images/properties/funBubbleHouseOther.jpg",
  },
  {
    title: "Gorgeous Garden Glamping Pod",
    location: "Meath",
    type: PropertyType.Other,
    pricePerNight: 120,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Gorgeous glamping pod nestled in a beautiful garden setting, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription: "A charming and tranquil glamping experience.",
    displayImage: "/images/properties/glampingPodOther.jpg",
  },
  {
    title: "Hogwarts Inspired Castle Stay",
    location: "Meath",
    type: PropertyType.Other,
    pricePerNight: 500,
    maxGuests: 10,
    status: PropertyStatus.Active,
    description:
      "Experience the magic of a Hogwarts-inspired castle stay, complete with whimsical decor and enchanting surroundings for a truly unforgettable experience.",
    shortDescription:
      "A magical and unique stay fit for wizards and muggles alike.",
    displayImage: "/images/properties/hogwartsCastleOther.jpg",
  },
  {
    title: "Bright Traditional House",
    location: "Roscommon",
    type: PropertyType.House,
    pricePerNight: 150,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Bright and cheerful traditional house located in a charming neighborhood, perfect for a comfortable and welcoming stay while exploring Roscommon.",
    shortDescription: "A delightful home away from home.",
    displayImage: "/images/properties/homeyHouse.jpg",
  },
  {
    title: "Scenic Peaceful Houseboat",
    location: "Sligo",
    type: PropertyType.Other,
    pricePerNight: 200,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Scenic and peaceful houseboat located on a tranquil lake, perfect for a unique and relaxing getaway surrounded by nature.",
    shortDescription: "A serene and memorable stay on the water.",
    displayImage: "/images/properties/houseboatOther.jpg",
  },
  {
    title: "Vast Refurbished Loft",
    location: "Sligo",
    type: PropertyType.Loft,
    pricePerNight: 170,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Vast and stylish refurbished loft with modern amenities, perfect for a comfortable and contemporary stay in Sligo.",
    shortDescription: "A spacious and chic urban retreat.",
    displayImage: "/images/properties/houseLikeLoft.jpg",
  },
  {
    title: "Idyllic Lakefront Glamping Dome",
    location: "Westmeath",
    type: PropertyType.Other,
    pricePerNight: 130,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Idyllic glamping dome located on the lakefront, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription:
      "A charming and tranquil glamping experience by the lake.",
    displayImage: "/images/properties/lakefrontOther.jpg",
  },
  {
    title: "Petite Vintage Studio",
    location: "Westmeath",
    type: PropertyType.Studio,
    pricePerNight: 100,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description:
      "Petite vintage studio located in a historic district, perfect for a cozy and unique stay.",
    shortDescription: "A charming and unique stay in a historic setting.",
    displayImage: "/images/properties/lakefrontStudio.jpg",
  },
  {
    title: "Radiant Serene Lakehouse",
    location: "Antrim",
    type: PropertyType.Other,
    pricePerNight: 300,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Radiant and serene lakehouse located on a peaceful lake, perfect for a relaxing and memorable getaway surrounded by nature.",
    shortDescription: "A tranquil and picturesque retreat by the lake.",
    displayImage: "/images/properties/lakeHouseBoatOther.jpg",
  },
  {
    title: "Lavish Picturesque House",
    location: "Antrim",
    type: PropertyType.House,
    pricePerNight: 250,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Lavish and picturesque house with stunning design and beautiful surroundings, perfect for a luxurious and unforgettable stay in Antrim.",
    shortDescription:
      "A sophisticated and opulent retreat in a scenic setting.",
    displayImage: "/images/properties/landscapeHouse.jpg",
  },
  {
    title: "Premium Rustic House",
    location: "Armagh",
    type: PropertyType.House,
    pricePerNight: 180,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Premium rustic house with charming decor and modern amenities, perfect for a comfortable and stylish stay in Armagh.",
    shortDescription: "A cozy and inviting retreat with rustic charm.",
    displayImage: "/images/properties/livingCoreHouse.jpg",
  },
  {
    title: "Luxurious Modern Style Castle",
    location: "Louth",
    type: PropertyType.Other,
    pricePerNight: 550,
    maxGuests: 10,
    status: PropertyStatus.Active,
    description:
      "Luxurious modern style castle with stunning design and high-end amenities, perfect for a lavish and unforgettable stay in Louth.",
    shortDescription:
      "A luxurious and unforgettable stay in a historic castle.",
    displayImage: "/images/properties/luxuryCastleOther.jpg",
  },
  {
    title: "In-demand High-end Townhouse",
    location: "Dublin",
    type: PropertyType.Townhouse,
    pricePerNight: 300,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "In-demand high-end townhouse with modern amenities and a prime location, perfect for a comfortable and stylish stay in Dublin.",
    shortDescription:
      "A desirable and well-appointed retreat in the heart of Dublin.",
    displayImage: "/images/properties/luxuryTownHouse.jpg",
  },
  {
    title: "Minecraft Inspired Modern Castle",
    location: "Fermanagh",
    type: PropertyType.Other,
    pricePerNight: 550,
    maxGuests: 10,
    status: PropertyStatus.Active,
    description:
      "Minecraft inspired modern castle with unique design and high-end amenities, perfect for a creative and unforgettable stay in Fermanagh.",
    shortDescription:
      "A unique and unforgettable stay in a Minecraft inspired castle.",
    displayImage: "/images/properties/minecraftCastleOther.jpg",
  },
  {
    title: "Modern Sleek Loft",
    location: "Cavan",
    type: PropertyType.Loft,
    pricePerNight: 150,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Modern sleek loft with a contemporary design and all necessary amenities, perfect for a comfortable and stylish stay in Cavan.",
    shortDescription: "A modern and stylish retreat in the heart of Cavan.",
    displayImage: "/images/properties/modernLoft.jpg",
  },
  {
    title: "Lavish Contemporary Bungalow",
    location: "Donegal",
    type: PropertyType.Bungalow,
    pricePerNight: 200,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Lavish contemporary bungalow with stunning design and beautiful surroundings, perfect for a luxurious and unforgettable stay in Donegal.",
    shortDescription:
      "A sophisticated and opulent retreat in a scenic setting.",
    displayImage: "/images/properties/modernBungalow.jpg",
  },
  {
    title: "Mountain View Boathouse",
    location: "Wicklow",
    type: PropertyType.Other,
    pricePerNight: 220,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Charming boathouse with stunning mountain views, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription: "A tranquil retreat with breathtaking mountain views.",
    displayImage: "/images/properties/mountainBoathouseOther.jpg",
  },
  {
    title: "Peaceful Breathtaking Countryside Cottage",
    location: "Mayo",
    type: PropertyType.Cottage,
    pricePerNight: 110,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Peaceful and breathtaking countryside cottage surrounded by stunning natural beauty, perfect for a tranquil and rejuvenating escape.",
    shortDescription: "A serene retreat for nature lovers.",
    displayImage: "/images/properties/naturalCottage.jpg",
  },
  {
    title: "Quaint Cozy Glamping Shed",
    location: "Dundalk",
    type: PropertyType.Other,
    pricePerNight: 100,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description:
      "Quaint and cozy glamping shed located in a scenic area, perfect for a unique and memorable outdoor stay with a touch of rustic charm.",
    shortDescription: "A charming and memorable glamping experience.",
    displayImage: "/images/properties/natureOther.jpg",
  },
  {
    title: "Picture Perfect Garden Bungalow",
    location: "Kilkenny",
    type: PropertyType.Bungalow,
    pricePerNight: 130,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Picture perfect garden bungalow surrounded by beautiful greenery and flowers, ideal for a peaceful and romantic getaway.",
    shortDescription: "A charming and tranquil retreat in a garden setting.",
    displayImage: "/images/properties/perfectBungalow.jpg",
  },
  {
    title: "Quirky Artistic Porchfront Studio",
    location: "Kilkenny",
    type: PropertyType.Studio,
    pricePerNight: 110,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description:
      "Quirky and artistic porchfront studio with unique decor, perfect for a creative and memorable stay in Kilkenny.",
    shortDescription: "A visually stunning and unforgettable accommodation.",
    displayImage: "/images/properties/porchFrontStudio.jpg",
  },
  {
    title: "Modern Secluded Premium Villa",
    location: "Limerick",
    type: PropertyType.Villa,
    pricePerNight: 350,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "Rustic and secluded premium villa with charming decor and modern amenities, perfect for a comfortable and stylish stay in Limerick.",
    shortDescription: "A cozy and inviting retreat with rustic charm.",
    displayImage: "/images/properties/premiumVilla.jpg",
  },
  {
    title: "Upscale Snug Cottage",
    location: "Limerick",
    type: PropertyType.Cottage,
    pricePerNight: 120,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Upscale snug cottage with stylish decor and modern amenities, perfect for a comfortable and memorable stay in Limerick.",
    shortDescription: "A cozy and stylish retreat in a charming setting.",
    displayImage: "/images/properties/prettyLittleLiarsCottage.jpg",
  },
  {
    title: "Private Secluded Forest Garden Townhouse",
    location: "Galway",
    type: PropertyType.Townhouse,
    pricePerNight: 200,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Private and secluded townhouse with a beautiful forest garden, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription: "A tranquil retreat with stunning garden views.",
    displayImage: "/images/properties/privateGardenTownhouse.jpg",
  },
  {
    title: "Relaxing Lakeside Cabin",
    location: "Donegal",
    type: PropertyType.Cabin,
    pricePerNight: 140,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Relaxing lakeside cabin with stunning views, perfect for a peaceful and rejuvenating getaway surrounded by nature.",
    shortDescription: "A serene retreat for nature lovers.",
    displayImage: "/images/properties/relaxingCabin.jpg",
  },
  {
    title: "Retro Ambient Lighthouse",
    location: "Clare",
    type: PropertyType.Other,
    pricePerNight: 300,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Retro and ambient lighthouse with unique decor, perfect for a memorable and atmospheric stay with stunning coastal views.",
    shortDescription: "A unique and unforgettable stay by the sea.",
    displayImage: "/images/properties/retroLighthouseOther.jpg",
  },
  {
    title: "Royalty Inspired Villa",
    location: "Roscommon",
    type: PropertyType.Villa,
    pricePerNight: 450,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "Royalty inspired villa with opulent decor and luxurious amenities, perfect for a lavish and unforgettable stay in Dublin.",
    shortDescription:
      "A regal and sophisticated retreat fit for kings and queens.",
    displayImage: "/images/properties/royaltyVilla.jpg",
  },
  {
    title: "Rustic Cozy Cabin",
    location: "Kerry",
    type: PropertyType.Cabin,
    pricePerNight: 120,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Rustic and cozy cabin with charming decor and modern amenities, perfect for a comfortable and memorable stay in Kerry.",
    shortDescription: "A cozy and inviting retreat with rustic charm.",
    displayImage: "/images/properties/rusticCabin.jpg",
  },
  {
    title: "Soft-toned Cushy Cottage",
    location: "Kildare",
    type: PropertyType.Cottage,
    pricePerNight: 110,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Soft-toned and cushy cottage with cozy decor and modern amenities, perfect for a comfortable and memorable stay in Kildare.",
    shortDescription: "A cozy and inviting retreat in a charming setting.",
    displayImage: "/images/properties/skinnyCottage.jpg",
  },
  {
    title: "Stylish Contemporary Duplex",
    location: "Dublin",
    type: PropertyType.Duplex,
    pricePerNight: 250,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Stylish contemporary duplex with modern design and high-end amenities, perfect for a luxurious and memorable stay in Dublin.",
    shortDescription: "A modern and elegant retreat in the heart of the city.",
    displayImage: "/images/properties/skinnyDuplex.jpg",
  },
  {
    title: "Tranquil Secluded Forest Villa",
    location: "Galway",
    type: PropertyType.Villa,
    pricePerNight: 400,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "Tranquil and secluded villa with beautiful forest views, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription: "A serene retreat with stunning natural surroundings.",
    displayImage: "/images/properties/skinnyVillaWithCars.jpg",
  },
  {
    title: "Unique Skyscraper Apartment",
    location: "Monaghan",
    type: PropertyType.Apartment,
    pricePerNight: 200,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Unique skyscraper apartment with modern design and stunning city views, perfect for a luxurious and memorable stay in Monaghan.",
    shortDescription: "A modern and elegant retreat in the heart of the city.",
    displayImage: "/images/properties/skyscraperApartment.jpg",
  },
  {
    title: "Petite Well-furnished Warm Loft",
    location: "Sligo",
    type: PropertyType.Loft,
    pricePerNight: 150,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Well-furnished warm loft with modern amenities and a cozy atmosphere, perfect for a comfortable and memorable stay in Sligo.",
    shortDescription: "A warm and inviting retreat with modern comforts.",
    displayImage: "/images/properties/smallLoft.jpg",
  },
  {
    title: "Modest Quaint Studio",
    location: "Leitrim",
    type: PropertyType.Studio,
    pricePerNight: 90,
    maxGuests: 2,
    status: PropertyStatus.Active,
    description:
      "Modest and quaint studio with cozy decor and modern amenities, perfect for a comfortable and memorable stay in Leitrim.",
    shortDescription: "A cozy and inviting retreat in a charming setting.",
    displayImage: "/images/properties/smallStudio.jpg",
  },
  {
    title: "Family-friendly Spacious House",
    location: "Cork",
    type: PropertyType.House,
    pricePerNight: 220,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Family-friendly spacious house with modern amenities and a welcoming atmosphere, perfect for a comfortable and memorable stay in Cork.",
    shortDescription: "A spacious and inviting retreat for families.",
    displayImage: "/images/properties/softcoreHouse.jpg",
  },
  {
    title: "Futuristic Funky Bubble Dome",
    location: "Donegal",
    type: PropertyType.Other,
    pricePerNight: 300,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Futuristic and funky bubble dome with modern design and stunning views, perfect for a unique and memorable stay in Donegal.",
    shortDescription: "A futuristic and unique retreat with modern amenities.",
    displayImage: "/images/properties/futuristicDome.jpg",
  },
  {
    title: "Charming Scenic Bungalow",
    location: "Mayo",
    type: PropertyType.Bungalow,
    pricePerNight: 120,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Charming and scenic bungalow with beautiful views, perfect for a peaceful and romantic getaway surrounded by nature.",
    shortDescription: "A charming and tranquil retreat with stunning views.",
    displayImage: "/images/properties/spaciousBungalow.jpg",
  },
  {
    title: "Perfectly Sized Cute Cottage",
    location: "Wexford",
    type: PropertyType.Cottage,
    pricePerNight: 100,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Perfectly sized and cute cottage with cozy decor and modern amenities, perfect for a comfortable and memorable stay in Wexford.",
    shortDescription: "A cozy and inviting retreat in a charming setting.",
    displayImage: "/images/properties/spanishCottage.jpg",
  },
  {
    title: "Stunning Stylish House",
    location: "Louth",
    type: PropertyType.House,
    pricePerNight: 250,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Stunning and stylish house with modern design and high-end amenities, perfect for a luxurious and memorable stay in Louth.",
    shortDescription: "A modern and elegant retreat in a scenic setting.",
    displayImage: "/images/properties/spanishHouse.jpg",
  },
  {
    title: "Elegant Modern Style Dome",
    location: "Kilkenny",
    type: PropertyType.Other,
    pricePerNight: 200,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Elegant modern style dome with stunning design and high-end amenities, perfect for a luxurious and memorable stay in Kilkenny.",
    shortDescription: "A unique and unforgettable stay in a modern dome.",
    displayImage: "/images/properties/spookyOther.jpg",
  },
  {
    title: "Appealing Secure Duplex",
    location: "Limerick",
    type: PropertyType.Duplex,
    pricePerNight: 180,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Appealing and secure duplex with modern amenities and a welcoming atmosphere, perfect for a comfortable and memorable stay in Limerick.",
    shortDescription: "A secure and inviting retreat for a memorable stay.",
    displayImage: "/images/properties/stylishDuplex.jpg",
  },
  {
    title: "Timeless Sophisticated Loft",
    location: "Clare",
    type: PropertyType.Loft,
    pricePerNight: 160,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Timeless and sophisticated loft with elegant decor and modern amenities, perfect for a comfortable and memorable stay in Clare.",
    shortDescription: "A stylish and elegant retreat in the heart of Clare.",
    displayImage: "/images/properties/stylishLoft.jpg",
  },
  {
    title: "Impressive Grandiose Submarine Stay",
    location: "Mayo",
    type: PropertyType.Other,
    pricePerNight: 400,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Impressive and grandiose submarine stay with unique design and high-end amenities, perfect for a luxurious and unforgettable experience in Mayo.",
    shortDescription: "A one-of-a-kind and unforgettable stay in a submarine.",
    displayImage: "/images/properties/submarineOther.jpg",
  },
  {
    title: "Sunny Charming Bungalow",
    location: "Sligo",
    type: PropertyType.Bungalow,
    pricePerNight: 120,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Sunny and charming bungalow with cozy decor and modern amenities, perfect for a comfortable and memorable stay in Sligo.",
    shortDescription: "A cozy and inviting retreat in a charming setting.",
    displayImage: "/images/properties/sunnyBungalow.jpg",
  },
  {
    title: "Lovely Trendy Stylish House",
    location: "Wicklow",
    type: PropertyType.House,
    pricePerNight: 220,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Lovely trendy stylish house with modern design and high-end amenities, perfect for a luxurious and memorable stay in Wicklow.",
    shortDescription: "A modern and elegant retreat in a scenic setting.",
    displayImage: "/images/properties/sunnyValeHouse.jpg",
  },
  {
    title: "Vibrant Artistic Duplex",
    location: "Kerry",
    type: PropertyType.Duplex,
    pricePerNight: 200,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Vibrant and artistic duplex with colorful decor and modern amenities, perfect for a lively and creative stay in Kerry.",
    shortDescription: "A fun and inspiring place to stay in Kerry.",
    displayImage: "/images/properties/sunshineDuplex.jpg",
  },
  {
    title: "The Most Luxurious Villa Stay",
    location: "Meath",
    type: PropertyType.Villa,
    pricePerNight: 500,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "The most luxurious villa stay with stunning design and high-end amenities, perfect for a lavish and unforgettable experience in Meath.",
    shortDescription:
      "An unparalleled and unforgettable stay in the most luxurious villa.",
    displayImage: "/images/properties/theMostLuxuryVilla.jpg",
  },
  {
    title: "Toasty Restful Duplex",
    location: "Offaly",
    type: PropertyType.Duplex,
    pricePerNight: 180,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Toasty and restful duplex with cozy decor and modern amenities, perfect for a comfortable and memorable stay in Offaly.",
    shortDescription: "A warm and inviting retreat for a memorable stay.",
    displayImage: "/images/properties/toastyDuplex.jpg",
  },
  {
    title: "Pleasant Airy Relaxing House",
    location: "Roscommon",
    type: PropertyType.House,
    pricePerNight: 150,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Pleasant and airy house with relaxing decor and modern amenities, perfect for a comfortable and memorable stay in Roscommon.",
    shortDescription: "A bright and inviting retreat for a memorable stay.",
    displayImage: "/images/properties/toastyHouse.jpg",
  },
  {
    title: "Total Divas Inspired House",
    location: "Galway",
    type: PropertyType.House,
    pricePerNight: 250,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Total Divas inspired house with glamorous decor and modern amenities, perfect for a fun and unforgettable stay in Galway.",
    shortDescription:
      "A glamorous and unforgettable stay in a Total Divas inspired house.",
    displayImage: "/images/properties/totalDivasHouse.jpg",
  },
  {
    title: "Cottagecore Inspired Cozy Townhouse",
    location: "Cavan",
    type: PropertyType.Townhouse,
    pricePerNight: 160,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Cottagecore inspired cozy townhouse with charming decor and modern amenities, perfect for a comfortable and memorable stay in Cavan.",
    shortDescription:
      "A cozy and charming retreat in a cottagecore inspired townhouse.",
    displayImage: "/images/properties/townhouseCottage.jpg",
  },
  {
    title: "Hazy Elegant Cabin",
    location: "Longford",
    type: PropertyType.Cabin,
    pricePerNight: 130,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Hazy and elegant cabin with stylish decor and modern amenities, perfect for a comfortable and memorable stay in Longford.",
    shortDescription: "A cozy and stylish retreat in a charming setting.",
    displayImage: "/images/properties/twilightLikeCabin.jpg",
  },
  {
    title: "Tasteful Picturesque Grand House",
    location: "Tyrone",
    type: PropertyType.House,
    pricePerNight: 250,
    maxGuests: 5,
    status: PropertyStatus.Active,
    description:
      "Tasteful and picturesque grand house with elegant decor and modern amenities, perfect for a luxurious and memorable stay in Tyrone.",
    shortDescription:
      "A sophisticated and elegant retreat in a scenic setting.",
    displayImage: "/images/properties/typicalAmericanHouse.jpg",
  },
  {
    title: "Ultra Modern Chic Townhouse",
    location: "Tyrone",
    type: PropertyType.Townhouse,
    pricePerNight: 300,
    maxGuests: 6,
    status: PropertyStatus.Active,
    description:
      "Ultra modern chic townhouse with sleek design and high-end amenities, perfect for a luxurious and memorable stay in Dublin.",
    shortDescription:
      "A stylish and unforgettable retreat in the heart of the city.",
    displayImage: "/images/properties/ultraLuxuryTownhouse.jpg",
  },
  {
    title: "Sophisticated Unique Villa",
    location: "Tipperary",
    type: PropertyType.Villa,
    pricePerNight: 350,
    maxGuests: 8,
    status: PropertyStatus.Active,
    description:
      "Sophisticated and unique villa with stunning design and high-end amenities, perfect for a luxurious and unforgettable stay in Tipperary.",
    shortDescription:
      "A sophisticated and unforgettable retreat in a unique villa.",
    displayImage: "/images/properties/ultraLuxuryVilla.jpg",
  },
  {
    title: "Ultra Cutting-edge Modern Style Loft",
    location: "Dublin",
    type: PropertyType.Loft,
    pricePerNight: 200,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Ultra cutting-edge modern style loft with industrial design and high-end amenities, perfect for a trendy and memorable stay in Dublin.",
    shortDescription:
      "A trendy and unforgettable retreat in a modern style loft.",
    displayImage: "/images/properties/ultraModernLoft.jpg",
  },
  {
    title: "Amber-lit Woodsy Cabin",
    location: "Wicklow",
    type: PropertyType.Cabin,
    pricePerNight: 140,
    maxGuests: 4,
    status: PropertyStatus.Active,
    description:
      "Amber-lit and woodsy cabin with cozy decor and modern amenities, perfect for a comfortable and memorable stay in Wicklow.",
    shortDescription: "A warm and inviting retreat in a charming setting.",
    displayImage: "/images/properties/woodsyCabin.jpg",
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
      image: "/images/avatars/avatar-09.png",
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
      image: "/images/avatars/avatar-08.png",
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
  image: string;
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
      password: password,
      ...input,
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
  const gapDays = 1 + (existingBookingCountForProperty % 3);

  const now = new Date();

  const earliestCheckIn = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      15,
      0,
      0,
      0,
    ),
  );

  if (now.getTime() >= earliestCheckIn.getTime()) {
    earliestCheckIn.setUTCDate(earliestCheckIn.getUTCDate() + 1);
  }

  let checkInDate = new Date(earliestCheckIn);

  if (lastBookingForProperty) {
    const nextAfterLastBooking = new Date(lastBookingForProperty.checkOutDate);
    nextAfterLastBooking.setUTCDate(
      nextAfterLastBooking.getUTCDate() + gapDays,
    );
    nextAfterLastBooking.setUTCHours(15, 0, 0, 0);

    if (nextAfterLastBooking.getTime() > checkInDate.getTime()) {
      checkInDate = nextAfterLastBooking;
    }
  }

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setUTCDate(checkOutDate.getUTCDate() + nights);
  checkOutDate.setUTCHours(11, 0, 0, 0);

  const bookedAt = new Date(checkInDate);
  bookedAt.setUTCDate(
    bookedAt.getUTCDate() - (7 + (existingBookingCountForProperty % 8)),
  );
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
