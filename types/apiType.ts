export type ApiType = {
	request: {
		parameters: {
			api_id: string;
			affiliate_id: string;
			site: string;
			cid: string;
		};
	};
	result: {
		status: number;
		result_count: number;
		total_count: number;
		first_position: number;
		items: Array<{
			service_code: string;
			service_name: string;
			floor_code: string;
			floor_name: string;
			category_name: string;
			content_id: string;
			product_id: string;
			title: string;
			volume: string;
			review: {
				count: number;
				average: string;
			};
			URL: string;
			affiliateURL: string;
			imageURL: {
				list: string;
				small: string;
				large: string;
			};
			sampleImageURL: {
				sample_s: {
					image: string[];
				};
				sample_l: {
					image: string[];
				};
			};
			sampleMovieURL: {
				size_476_306: string;
				size_560_360: string;
				size_644_414: string;
				size_720_480: string;
				pc_flag: number;
				sp_flag: number;
			};
			prices: {
				price: string;
			};
			date: string;
			iteminfo: {
				genre: Array<{ id: number; name: string }>;
				series: Array<{ id: number; name: string }>;
				maker: Array<{ id: number; name: string }>;
				actress: Array<{ id: number; name: string; ruby: string }>;
				director: Array<{ id: number; name: string; ruby: string }>;
				label: Array<{ id: number; name: string }>;
			};
		}>;
	};
};
