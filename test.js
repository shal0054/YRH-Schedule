function getCountryName(code) {
	function getUrl(PAGE_NUMBER) {
		return `https://jsonmock.hackerrank.com/api/countries?page=${PAGE_NUMBER}`;
	}

	let n = 1;

	function getAPage(pageNum) {
		fetch(getUrl())
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
			});
	}

	getAPage(n);
}

getCountryName('AF');
