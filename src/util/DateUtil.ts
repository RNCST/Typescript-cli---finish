export default class DateUtil{


    static today(){
        
        const date = new Date();
        const yyyy =date.getFullYear();
        const mm = date.getMonth()+1;
        const dd = date.getDate();

        return `${yyyy} - ${this.setNum(mm)} - ${this.setNum(dd)}`;
    }

    private static setNum(n:number )  {
     
        return  n<10 ? `0${n}` : n ;
        
    }
}