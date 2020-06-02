const baseUrl = process.env.REACT_APP_API_BASE_URL

export const searchPlace = async (placeName, cb) => {
    const searchByNameEndpoint = 'geocoding_by_place_name'
    const queryString = encodeURIComponent(placeName)
    fetch(baseUrl+ searchByNameEndpoint + '?place_name=' + queryString).then(response => {
        console.log('I have data')
        data = response.json()
        const {results} = data
        if(cb){
            cb(results)
        }
    })
}