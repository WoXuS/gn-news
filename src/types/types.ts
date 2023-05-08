export interface NewsItem {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
  
  export interface transformedCountryData {
    flag: {
      png: string;
      svg: string;
      alt: string;
    };
    countryCode: string;
    countryName: string;
}
  
export enum ViewTypes {
  tiles = "tiles",
  list = "list"
}