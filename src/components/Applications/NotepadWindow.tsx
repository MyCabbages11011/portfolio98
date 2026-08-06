import { useState } from "react";
import "./NotepadWindow.css";

interface NotepadWindowProps {
    initialText?: string;
}

function NotepadWindow({ initialText = "" }: NotepadWindowProps) {
    const [text, setText] = useState(initialText);

    return (
        <div className="notepad-container">
            <div className="notepad-menubar">
                <span><u>F</u>ile</span>
                <span><u>E</u>dit</span>
                <span><u>S</u>earch</span>
                <span><u>H</u>elp</span>
            </div>
            <textarea
                className="notepad-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                spellCheck={false}
            />
            <div className="notepad-statusbar">
                <span>Ln 1, Col 1</span>
            </div>
        </div>
    );
}

export default NotepadWindow;