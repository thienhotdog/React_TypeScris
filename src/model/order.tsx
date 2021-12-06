export interface Order {
    _id: number,
    name: string,
    status: string,
    products: [],
    email: string,
    amount: Number,
    address: string,
    userId: number
}