export enum WeekDay {
    Mon, // 0
    Tue, // 1
    Wed, // 2
    Thu, // 3
    Fri, // 4
    Sat, // 5
    Sun  // 6
}

export enum Category {
    company = "COMPANY",
    personal = "PERSONAL",
    event = "EVENT"
}

export const CategoryColor:Record<Category, string> ={
    [Category.company] : "bg-green-500",
    [Category.event] : "bg-pink-500",
    [Category.personal] : "bg-blue-300"
}