export class ValidatorService {
	static min(value, min) {
		if (value.length < min) {
			return `Can't be less than ${min} character(s)`
		}
	}

	static max(value, max) {
		if (value.length > max) {
			return `Can't be more than ${max} character(s)`
		}
	}
}