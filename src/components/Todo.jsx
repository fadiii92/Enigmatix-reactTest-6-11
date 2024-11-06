import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

function Todo() {
    const [input, setinput] = useState('');
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['todos']);

    const todoSubmit = () => {
        if (editMode) {
            const updatedTodos = cookies.todos.map(item => item.id === editId ? { ...item, todo: input } : item)
            
            setCookie('todos', updatedTodos)
            setEditMode(false)
            setEditId(null)
            return
        }
        
            const item = { id: Math.random(), todo: input };
            const previousItems = cookies.todos || [];
            setCookie('todos', [...previousItems, item]);
        

        setinput('');
    };


    const handleDelete = (id) => {
        setCookie('todos', cookies.todos.filter((item) => item.id !== id));
    };

    const handleEdit = (id) => {
        const itemToEdit = cookies.todos.find((item) => item.id === id);
        setinput(itemToEdit.todo);
        setEditMode(true);
        setEditId(id);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={input}
                    onChange={(e) => setinput(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    onClick={todoSubmit}
                    className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
                >
                    {editMode ? 'Update' : 'Add Todo' }
                </button>
            </div>
            <div>
                <ul className="space-y-2 min-h-80">
                    {cookies.todos?.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                        >
                            <p className="text-gray-700 flex-1">{item.todo}</p>
                            <div className="space-x-2">
                                <button 
                                    onClick={()=>handleEdit(item.id)}
                                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                    onClick={()=>removeCookie('todos')}
                    className="px-4 py-2 mt-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
                >
                    DeleteAll
                </button>
        </div>
    );
}

export default Todo;
