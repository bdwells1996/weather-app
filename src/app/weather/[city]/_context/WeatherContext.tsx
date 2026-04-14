'use client'

import { createContext, useContext } from 'react'
import type { WeatherData } from '@/lib/weather'

interface WeatherContextValue {
	weather: WeatherData | null
	error: string | null
}

const WeatherContext = createContext<WeatherContextValue | null>(null)

export function WeatherProvider({
	children,
	weather,
	error,
}: {
	children: React.ReactNode
	weather: WeatherData | null
	error: string | null
}) {
	return (
		<WeatherContext.Provider value={{ weather, error }}>
			{children}
		</WeatherContext.Provider>
	)
}

export function useWeather(): WeatherContextValue {
	const ctx = useContext(WeatherContext)
	if (!ctx) throw new Error('useWeather must be used within a WeatherProvider')
	return ctx
}
