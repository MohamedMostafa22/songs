import axios from "../axios";
import _forEach from "lodash/forEach";
import _isUndefined from "lodash/isUndefined";

function getSongs({ start, limit, search, range }) {
  const queryParams = (() => {
    let query = "";
    if (_isUndefined(start) && _isUndefined(limit) && !range) return query;
    else query = "?";
    if (search) {
      _forEach(search, (value, key) => {
        query += `${key}_like=${value}`;
      });
    }
    if (range) {
      if (search) query += "&";
      _forEach(range, (value, key) => {
        query += `${key}_gte=${value.min}&${key}_lte=${value.max}`;
      });
    }
    // if (filters) {
    //   if (search) query += "&";
    //   _forEach(filters, (value, key) => {
    //     query += `${key}=${value}`;
    //   });
    // }
    if (!_isUndefined(start) && !_isUndefined(limit)) {
      if (search || range) query += "&";
      query += `_start=${start}&_limit=${limit}`;
    }
    return query;
  })();
  return axios.get(`/songs${queryParams}`);
}

function addSong(song) {
  return axios.post("/songs", song);
}

function getFavorites() {
  return axios.get("/favorites");
}

function addToFavorites(id) {
  return axios.post("/favorites", { id });
}

function removeFromFavorites(id) {
  return axios.delete(`/favorites/${id}`);
}

export { getSongs, addSong, getFavorites, addToFavorites, removeFromFavorites };
