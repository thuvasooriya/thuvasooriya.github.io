export const ENV = {
	NODE_ENV: import.meta.env.NODE_ENV,
	PROD: import.meta.env.PROD,
	DEV: import.meta.env.DEV,
	SSR: import.meta.env.SSR,
	SITE: import.meta.env.SITE,
	BASE_URL: import.meta.env.BASE_URL,
} as const;

export function isDevelopment(): boolean {
	return ENV.DEV;
}

export function isProduction(): boolean {
	return ENV.PROD;
}

export function isSSR(): boolean {
	return ENV.SSR;
}

export function getEnvVar(key: string, fallback: string = ""): string {
	const value = import.meta.env[key];
	return value ?? fallback;
}

export function getRequiredEnvVar(key: string): string {
	const value = import.meta.env[key];
	if (!value) {
		throw new Error(`Required environment variable ${key} is not set`);
	}
	return value;
}

export function validateEnvironment(): void {
	const requiredVars = ["SITE"];
	const missingVars = requiredVars.filter((key) => !import.meta.env[key]);

	if (missingVars.length > 0) {
		throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
	}
}

export function getBaseUrl(): string {
	return ENV.BASE_URL || "/";
}

export function getSiteUrl(): string {
	return ENV.SITE || "http://localhost:4321";
}

export function isDebugMode(): boolean {
	return isDevelopment() || getEnvVar("DEBUG") === "true";
}

export function logEnvironmentInfo(): void {
	if (!isDevelopment()) return;

	console.log("Environment Info:", {
		NODE_ENV: ENV.NODE_ENV,
		PROD: ENV.PROD,
		DEV: ENV.DEV,
		SSR: ENV.SSR,
		SITE: ENV.SITE,
		BASE_URL: ENV.BASE_URL,
	});
}
