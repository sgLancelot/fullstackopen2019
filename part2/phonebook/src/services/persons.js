import axios from 'axios'
const baseURL='http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response=>response.data)
}

const del = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default {getAll, create, del}