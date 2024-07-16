import './App.css'
import Main from "./components/Main.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {useEffect, useState} from "react";
import uuid from "react-uuid";

function App() {
    const [notes, setNotes] = useState([])
    const [activeNote, setActiveNote] = useState(false);
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);
    const onAddNote =() =>{
        const newNote = {
            id: uuid(),
            title: "",
            content: "",
            modDate: Date.now()
        };
        setNotes([...notes, newNote]);
        console.log(notes);
    };
    const onDeleteNote = (id) =>{
        const filterNotes = notes.filter((note) => note.id !== id);
        setNotes(filterNotes);
    }

    const getActiveNote =()=>{
        return notes.find((note) => note.id === activeNote);
    }

    const onUpdateNote = (updatedNote) =>{
        //修正された新しいノートの配列を返す。
        const updatedNotesArray = notes.map((note) => {
            if (note.id !== updatedNote.id){
                return updatedNote;
            }else{
                return note;
            }
        });
        setNotes(updatedNotesArray);
    };

    return(
        <div className="App">
            <Sidebar
                onAddNote={onAddNote}
                notes={notes}
                onDeleteNote={onDeleteNote}
                setActiveNote={setActiveNote}
            />
            <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
        </div>
    )

}

export default App
