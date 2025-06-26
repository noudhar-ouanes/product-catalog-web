export type Product={  
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    favorite: boolean
    
}
export type ProductList = Product[];

export type SortOption = 'Default' | 'Price: Low to High' | 'Price: High to Low';
