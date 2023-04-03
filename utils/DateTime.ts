import {Obj} from "./type/Obj";

export let formatDate = (date: string | number | Date) => {
    const options : Obj = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en', options)
}
