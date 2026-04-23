import { db } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

function parseNumber(value: string | null) {
  const parsed = Number(value ?? 0);

  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function parseTimestamp(value: string | null) {
  const parsed = Number(value ?? 0);

  if (!parsed || Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
}

function normalizeCounty(value: string) {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/^county\s+/, "");
}

function datesOverlap(
  rangeStart: number,
  rangeEnd: number,
  bookingStart: number,
  bookingEnd: number,
) {
  return rangeStart < bookingEnd && bookingStart < rangeEnd;
}

export const load: PageServerLoad = async ({ url }) => {
  const county = url.searchParams.get("county")?.trim() ?? "";
  const adults = parseNumber(url.searchParams.get("adults"));
  const children = parseNumber(url.searchParams.get("children"));
  const infants = parseNumber(url.searchParams.get("infants"));

  const totalGuests = adults + children + infants;

  let checkIn = parseTimestamp(url.searchParams.get("checkIn"));
  let checkOut = parseTimestamp(url.searchParams.get("checkOut"));

  if (checkIn !== null && checkOut !== null && checkIn >= checkOut) {
    checkIn = null;
    checkOut = null;
  }

  const properties = await db.propertyRepo.find({
    relations: {
      bookings: true,
    },
    order: {
      title: "ASC",
    },
  });

  const normalizedCounty = normalizeCounty(county);

  const filteredProperties = properties.filter((property) => {
    if (
      normalizedCounty.length > 0 &&
      !normalizeCounty(property.location).includes(normalizedCounty)
    ) {
      return false;
    }

    if (totalGuests > 0 && property.maxGuests < totalGuests) {
      return false;
    }

    if (checkIn !== null && checkOut !== null) {
      const overlapsExistingBooking = property.bookings.some((booking) =>
        datesOverlap(
          checkIn,
          checkOut,
          booking.checkInDate.getTime(),
          booking.checkOutDate.getTime(),
        ),
      );

      if (overlapsExistingBooking) {
        return false;
      }
    }

    return true;
  });

  return {
    properties: structuredClone(filteredProperties),
  };
};
