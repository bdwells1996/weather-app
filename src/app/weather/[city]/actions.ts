"use server";

import { revalidateTag } from "next/cache";

export async function refreshWeather(latitude: number, longitude: number) {
	revalidateTag(`forecast:${latitude},${longitude}`, "max");
}
