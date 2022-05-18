import React, { useEffect, useRef, useState } from 'react';
import './Home.css'

import delet from '../../Image/Editing/delete.png';
import editImage from '../../Image/Editing/edit.png';
import done from '../../Image/Editing/done.png';


const Home = () => {
    const [edit, setEdit] = useState(0);

    const noteRef = useRef()


    const [note, setNote] = useState([])


    const addTodoHandler = (event) => {
        event.preventDefault()
        const noteValue = noteRef.current.value;
        const newNote = {
            id: note.length + 1,
            note: noteValue,
            done: false
        }
        
        if (!edit) {
            setNote([...note, newNote])
        }
        else{
            const findNote = note.find(data => data.id === edit)
            findNote.note = noteRef.current.value;
            const filterNote = note.filter(data => data.id !== edit)
            setNote([findNote, ...filterNote])
        }
        event.target.reset()
        setEdit(0)
    }


    const handleNote = (id, method, event) => {

        if (method === 'delete') {
            const newNote = note.filter(data => data.id !== id)
            console.log(newNote)
            setNote(newNote)
        }
        else if (method === 'edit') {
            const edit = note.find(data => data.id === id);
            noteRef.current.value = edit.note
            setEdit(id)
        }
        else if (method === 'done') {
            const findNote = note.find(data => data.id === id)
            findNote.done = true;
            const filterNote = note.filter(data => data.id !== id)
            setNote([...filterNote, findNote])
        }
    }
    return (
        <div className='home'>
            <div>
                <form className='addInput' onSubmit={addTodoHandler}>
                    <input ref={noteRef} required name='note' type="text" />
                    <button>{edit ? 'Save' : 'Add'}</button>
                </form>
            </div>
            <div style={{ height: '100vh', overflow: 'auto' }}>
                {
                    note.map((data) =>
                        <div key={data.id} id={'note' + data.id} className='showInputField'>
                            <p className={data.done ? 'strike' : ''}>
                                {data.note}
                            </p>
                            <div>
                                <button onClick={(event) => handleNote(data.id, 'edit', event)}>
                                    <img src={editImage} alt="" />
                                </button>
                                <button onClick={(event) => handleNote(data.id, 'done', event)}>
                                    <img src={done} alt="" />
                                </button>
                                <button onClick={(event) => handleNote(data.id, 'delete', event)}>
                                    <img src={delet} alt="" />
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;