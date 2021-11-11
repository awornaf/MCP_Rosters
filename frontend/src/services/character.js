import http from "../http-common";

class CharacterDataService {
    getAll(page = 0) {
        return http.get(`characters?page=${page}`);
    }
    
    get(id) {
        return http.get(`/characters?id=${id}`);
    }
    
    find(query, by = "name", page = 0) {
        return http.get(`characters?${by}=${query}&page=${page}`);
    } 
    
    // getAffiliation(id) {
    //     return http.get(`/affiliation`);
    // }
}

export default new CharacterDataService();