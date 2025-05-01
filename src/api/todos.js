import axios from 'axios'

export const fetchAllToDos = async () => {
    try{
        const res = await axios.get('http://localhost:3000/todos');
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchToDos = async (page) => {
    try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_per_page=5`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchToDo = async (id) => {
    try{
        const res = await axios.get(`http://localhost:3000/todos/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
    
}

export const createToDo = async (toDoData) => {
    try{
        const res = await axios.post('http://localhost:3000/todos', toDoData);
        return res.data;
    } catch (error) {
        console.error(error);
    }
    
}

export const updateToDo = async (toDo) => {
    try{
        const res = await axios.patch(`http://localhost:3000/todos/${toDo.id}`, toDo);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteToDo = async (id) => {
    try{
        await axios.delete(`http://localhost:3000/todos/${id}`);   
    } catch (error) {
        console.error(error);
    }
}