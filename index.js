const csv = require('csv-parser')
const fs  = require('fs')

const results = []

fs.createReadStream('gps.csv')
    .pipe(csv({}))
    .on('data' , (data) => results.push(data))
    .on('end' , () => {
        results.forEach((data)=>{   
            if(data['GPS COORDINATES'].includes("N")) {
                
                let change = data['GPS COORDINATES']
                let changeIndex = change.indexOf('N')
                
                let lat = change.slice(0 , changeIndex + 1)
                let long = change.slice(changeIndex + 1 , change.length )
                
                data['GPS COORDINATES'] = convertDMSToDD(lat) + "," + convertDMSToDD_(long)
                console.log(data)
            }
        })
    })



    const convertDMSToDD = (dms) => {

            let parts = dms.split(/[^\d+(\,\d+)\d+(\.\d+)?\w]+/);
            let degrees = parseFloat(parts[0]);
            let minutes = parseFloat(parts[1]);
            let seconds = parseFloat(parts[2].replace(',' , '.'));
            let direction = parts[3];
        
            let dd = degrees + minutes / 60 + seconds / (60 * 60);
        
            if (direction == 'S' || direction == 'W') {
              dd = dd * -1;
            } 
            return dd;
    }

    const convertDMSToDD_ = (dms) => {
            let parts = dms.split(/[^\d+(\,\d+)\d+(\.\d+)?\w]+/);
            let degrees = parseFloat(parts[0]);
            let minutes = parseFloat(parts[1]);
            let seconds = parseFloat(parts[2].replace(',' , '.'));
            let direction = parts[3];
        
            let dd = degrees + minutes / 60 + seconds / (60 * 60);
        
            if (direction == 'S' || direction == 'W') {
              dd = dd * -1;
            } 
            return dd;
    }
   
