export const fetcherJSON = (url: string, config?: RequestInit) =>
	fetch(url, config).then(async (res) => {
		if (res.ok) {
			return res.json();
		}
		const error = await res.json();
		return Promise.reject(error);
	});
