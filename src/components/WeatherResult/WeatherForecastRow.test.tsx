import { MOCK_WEATHER } from "@/lib/mockData";
import { render, screen } from "@testing-library/react";
import { WeatherForecastRow } from "./WeatherForecastRow";

describe("WeatherForecastRow", () => {
	it("renders a card for each day in the forecast", () => {
		render(<WeatherForecastRow weather={MOCK_WEATHER} />);
		// MOCK_WEATHER has 7 daily entries; each gets a weather emoji with an aria-label
		const weatherIcons = screen.getAllByRole("img");
		expect(weatherIcons).toHaveLength(MOCK_WEATHER.daily.length);
	});

	it("labels the first card 'Today' and uses plain weekday names for the rest", () => {
		render(<WeatherForecastRow weather={MOCK_WEATHER} />);
		// The first day should include the word "Today"
		const todayEl = screen.getByText(/today/i);
		expect(todayEl).toBeInTheDocument();

		// Remaining six days should NOT contain "Today"
		const allDayLabels = screen.getAllByText(
			/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/i,
		);
		expect(allDayLabels).toHaveLength(6);
	});

	it("displays rounded max and min temperatures for every forecast day", () => {
		render(<WeatherForecastRow weather={MOCK_WEATHER} />);
		// Temperature values may repeat across days, so collect unique values and
		// confirm each appears at least once in the rendered output.
		const uniqueTemps = new Set(
			MOCK_WEATHER.daily.flatMap((day) => [
				`${Math.round(day.maxTemperature)}°`,
				`${Math.round(day.minTemperature)}°`,
			]),
		);
		for (const temp of uniqueTemps) {
			expect(screen.getAllByText(temp).length).toBeGreaterThanOrEqual(1);
		}
	});
});
