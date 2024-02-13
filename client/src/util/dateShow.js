export function dateShow(fulldate){
    let date = fulldate.split('-')[2];
    let month = fulldate.split('-')[1];

    switch(month){
        case '01' : month = 'Jan'; break;
        case '02' : month = 'Feb'; break;
        case '03' : month = 'Mar'; break;
        case '04' : month = 'Apr'; break;
        case '05' : month = 'May'; break;
        case '06' : month = 'Jun'; break;
        case '07' : month = 'Jul'; break;
        case '08' : month = 'Aug'; break;
        case '09' : month = 'Sep'; break;
        case '10' : month = 'Oct'; break;
        case '11' : month = 'Nov'; break;
        case '12' : month = 'Dec'; break;
    }

    return date + ' ' + month;
}