import { IUser, IStore, IProduct, IProductList, WeekDay, DayWorkingHours } from "../types/main";  

const users: Array<IUser> = [
    {
        username: "traveller",
        first_name: "Bilbo",
        last_name: "Baggins",
        email: "b.beggins@shire.jrrt"
    },
    {
        username: "carrier",
        first_name: "Frodo",
        last_name: "Baggins",
        email: "f.beggins@shire.jrrt"
    },
    {
        username: "gray",
        first_name: "Gandalf",
        email: "gendalf@valinor.jrrt"
    },
    {
        username: "chief",
        first_name: "Saruman",
        email: "saruman@isengard.jrrt"
    },
    {
        username: "the_eye",
        first_name: "Sauron",
        email: "sauron@mordor.jrrt" 
    },
];

const stores: Array<IStore> = [
    {
        name: "Costco",
        address: "7725 188th Ave NE, Redmond, WA 98052",
        working_hours: [
            {
                week_day:"Saturday" ,
                open: "9:30 AM",
                close:  "6 PM"
            },
            {
                week_day: "Sunday",
                open: "10 AM",
                close: "6 PM"
            }
        ]
    },
    {
        name: "Fred Meyer",
        address: "2041 148th Ave NE, Bellevue, WA 98007",
        working_hours: [
            {
                week_day: "Monday",
                open: "6 AM",
                close: "11 PM"
            },
            {
                week_day: "Thursday",
                open: "6 AM",
                close: "11 PM"
            }
        ]
    },
    {
        name: "Safeway",
        address: "630 228th Ave NE, Sammamish, WA 98074",
        working_hours: [
            {
                week_day: "Wednesday",
                open: "5 AM",
                close: '1 AM'
            },
            {
                week_day: "Thursday",
                open: "5 AM",
                close: '1 AM' 
            },
            {
                week_day: "Friday",
                open: "5 AM",
                close: '1 AM' 
            },
            {
                week_day: "Saturday",
                open: "5 AM",
                close: '1 AM' 
            }
        ]
    },
    {
        name: "Target",
        address: "4053 Factoria Square Mall SE, Bellevue, WA 98006",
        working_hours: [
            {
                week_day: "Sunday",
                open: "8 AM",
                close: "10 PM"
            },
            {
                week_day: "Tuesday",
                open: "8 AM",
                close: "10 PM" 
            },
            {
                week_day: "Thursday",
                open: "8 AM",
                close: "10 PM"
            }
        ]
    },
    {
        name: "Trader Joe's" ,
        address: "975 NW Gilman Blvd, Issaquah, WA 98027",
        working_hours: [
            {
                week_day: "Monday",
                open: "8 AM",
                close: "9 PM"
            },
            {
                week_day: "Tuesday",
                open: "8 AM",
                close: "9 PM"
            },
            {
                week_day: "Wednesday",
                open: "8 AM",
                close: "9 PM" 
            },
            {
                week_day: "Friday",
                open: "8 AM",
                close: "9 PM" 
            }
        ]
    },
];

export {users, stores}