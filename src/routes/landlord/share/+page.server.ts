import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

type ViewMode = "weekly" | "monthly";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1; // Monday = start of week

  d.setDate(d.getDate() - diff);
  return d;
}

function last12Weeks() {
  const currentWeek = startOfWeek(new Date());

  const topFormatter = new Intl.DateTimeFormat("en-IE", {
    day: "2-digit",
    month: "short",
  });

  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentWeek);
    date.setDate(currentWeek.getDate() - (11 - i) * 7);

    return {
      key: dayKey(date),
      labelTop: topFormatter.format(date),
      labelBottom: String(date.getFullYear()),
    };
  });
}

function last12Months() {
  const now = new Date();

  const monthFormatter = new Intl.DateTimeFormat("en-IE", {
    month: "short",
  });

  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);

    return {
      key: monthKey(date),
      labelTop: monthFormatter.format(date),
      labelBottom: String(date.getFullYear()),
    };
  });
}

export const load: PageServerLoad = async ({ locals, url }) => {
  const user = locals.user;

  if (!user) {
    throw redirect(303, "/login");
  }

  const landlord = await db.landlordRepo.findOne({
    where: { userId: user.id },
  });

  if (!landlord) {
    throw redirect(303, "/");
  }

  const properties = await db.propertyRepo.find({
    where: { landlordUserId: user.id },
    relations: { bookings: true },
  });

  const view: ViewMode =
    url.searchParams.get("view") === "monthly" ? "monthly" : "weekly";

  const incomeShare = Number(landlord.incomeShare);
  const multiplier = incomeShare > 1 ? incomeShare / 100 : incomeShare;

  const periods = view === "monthly" ? last12Months() : last12Weeks();
  const totals = Object.fromEntries(periods.map((period) => [period.key, 0]));

  let totalEarned = 0;

  for (const property of properties) {
    for (const booking of property.bookings ?? []) {
      const bookedAt = new Date(booking.bookedAt);

      const key =
        view === "monthly" ? monthKey(bookedAt) : dayKey(startOfWeek(bookedAt));

      if (!(key in totals)) continue;

      const bookingPrice = Number(booking.bookingPrice);

      totalEarned += bookingPrice;
      totals[key] += bookingPrice * multiplier;
    }
  }

  const chartData = periods.map((period) => ({
    labelTop: period.labelTop,
    labelBottom: period.labelBottom,
    total: Number(totals[period.key].toFixed(2)),
  }));

  const totalIncome = Number(
    chartData.reduce((sum, item) => sum + item.total, 0).toFixed(2),
  );

  return {
    view,
    chartData,
    totalEarned: Number(totalEarned.toFixed(2)),
    totalIncome,
    incomeSharePercentage: Number((multiplier * 100).toFixed(2)),
  };
};
