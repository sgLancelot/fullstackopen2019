import axios from 'axios'
const baseURL='/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response=>response.data)
}

const del = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const amend = (newID, changedPerson) => {
    return axios.put(`${baseURL}/${newID}`, changedPerson)
}

export default {getAll, create, del, amend}