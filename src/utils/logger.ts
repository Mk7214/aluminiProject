export class Logger {
	private static formatMessage(
		level: string,
		message: string,
		meta?: any,
	): string {
		const timestamp = new Date().toISOString();
		let metaStr = "";

		if (meta instanceof Error) {
			metaStr = ` ${meta.message}\n${meta.stack}`;
		} else if (meta) {
			try {
				metaStr = ` ${JSON.stringify(meta)}`;
			} catch {
				metaStr = " [unserializable meta]";
			}
		}

		return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
	}
	private static colorize(level: string, text: string): string {
		const colors: Record<string, string> = {
			INFO: "\x1b[32m", // green
			WARN: "\x1b[33m", // yellow
			ERROR: "\x1b[31m", // red
			DEBUG: "\x1b[36m", // cyan
		};
		const reset = "\x1b[0m";
		return `${colors[level.toUpperCase()] || ""}${text}${reset}`;
	}
	static info(message: string, meta?: any): void {
		console.log(
			this.colorize("INFO", this.formatMessage("info", message, meta)),
		);
	}

	static error(message: string, error?: any): void {
		console.error(
			this.colorize("ERROR", this.formatMessage("error", message, error)),
		);
	}

	static warn(message: string, meta?: any): void {
		console.warn(
			this.colorize("WARN", this.formatMessage("warn", message, meta)),
		);
	}

	static debug(message: string, meta?: any): void {
		if (process.env.NODE_ENV === "development") {
			console.log(
				this.colorize("DEBUG", this.formatMessage("debug", message, meta)),
			);
		}
	}
}
