export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string = "Resource") {
		super(`${resource} not found`, 404);
	}
}

export class ContentError extends AppError {
	constructor(message: string) {
		super(`Content error: ${message}`, 422);
	}
}

export async function safeAsync<T>(
	fn: () => Promise<T>,
	fallback?: T,
): Promise<{ data: T | null; error: Error | null }> {
	try {
		const data = await fn();
		return { data, error: null };
	} catch (error) {
		console.error("Async operation failed:", error);
		return {
			data: fallback ?? null,
			error: error instanceof Error ? error : new Error(String(error)),
		};
	}
}

export function safeSync<T>(fn: () => T, fallback?: T): { data: T | null; error: Error | null } {
	try {
		const data = fn();
		return { data, error: null };
	} catch (error) {
		console.error("Sync operation failed:", error);
		return {
			data: fallback ?? null,
			error: error instanceof Error ? error : new Error(String(error)),
		};
	}
}

export function assert(condition: boolean, message: string): asserts condition {
	if (!condition) {
		throw new ValidationError(message);
	}
}

export function isOperationalError(error: Error): boolean {
	if (error instanceof AppError) {
		return error.isOperational;
	}
	return false;
}

export function formatError(error: Error): string {
	return `${error.name}: ${error.message}\n${error.stack}`;
}

export function handleError(error: Error, context?: string): void {
	const prefix = context ? `[${context}]` : "";

	if (import.meta.env.DEV) {
		console.error(`${prefix} Error:`, formatError(error));
	} else {
		console.error(`${prefix} Error:`, error.message);
	}
}

export async function retry<T>(
	fn: () => Promise<T>,
	attempts: number = 3,
	delay: number = 1000,
): Promise<T> {
	let lastError: Error;

	for (let i = 0; i < attempts; i++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error));

			if (i === attempts - 1) {
				throw lastError;
			}

			await new Promise((resolve) => setTimeout(resolve, delay * 2 ** i));
		}
	}

	// unreachable: loop always throws on last attempt
	throw new Error("retry failed");
}
