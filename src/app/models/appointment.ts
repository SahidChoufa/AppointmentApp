export interface Appointment {
    id: number,
    title: string,
    service: string,
    price: number,
    date: Date,
    customerName: string,
    customerAge: number
}

export interface Service {
    name: string,
    price: number,
    duration: string,
    image: string
}