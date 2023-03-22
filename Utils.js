const D = {
    UP: 'Up',
    DOWN: 'Down',
    LEFT: 'Left',
    RIGHT: 'Right'
  };

const INTRO_TEXT = "Welcome to the KIWIGR Demo!\n\
The following gestures can be used to navigate around the text seen here:\n\
\n\
To move the cursor between characters, swipe UP, DOWN, RIGHT, or LEFT on the F-KEY.\n\
To move the cursor between sentences, swipe UP, DOWN, RIGHT, or LEFT on the F-KEY and D-KEY.\n\
To move the cursor between paragraphs, swipe UP, DOWN, RIGHT, or LEFT on the F-KEY, D-KEY, and S-KEY.\n\
To move the cursor between sections, swipe UP, DOWN, RIGHT, or LEFT on the F-KEY, D-KEY, S-KEY, and A-KEY.\n\
\n\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut metus lacus. Proin at dolor eu nisi\n\
sagittis ultrices. Quisque suscipit velit quis fermentum mollis. Vivamus vel tincidunt nisi, in fermentum\n\
neque. Aliquam orci lectus, maximus ultrices sapien vitae, molestie rutrum tortor. Vivamus pretium, lorem\n\
in varius consequat, lectus nulla consectetur ante, non condimentum justo erat id purus. Duis feugiat eu \n\
diam sed venenatis. Pellentesque tristique ex tincidunt, pharetra lacus nec, bibendum turpis. Vestibulum \n\
fermentum lectus consequat vehicula egestas.\n\
\n\
Vestibulum ornare erat turpis, eget gravida dui pharetra at. Sed tristique porttitor dui, ac tempor risus\n\
maximus non. Donec molestie nisl ut neque consectetur, vitae condimentum dolor laoreet. Mauris lacinia nibh\n\
eget arcu aliquam suscipit. Integer consectetur tellus in massa ornare ornare. Aenean pharetra luctus nibh.\n\
Maecenas vel massa ut libero gravida auctor ut sit amet purus. Suspendisse maximus mi convallis orci vulputate,\n\
a feugiat est rutrum.\n\
\0";

function getPositionInDocString(cursorPosition, lineNumber) {
    editor.focus();
    var doc = editor.getValue();
    var positionInDocString = 0;
    var currentLineNumber = 0;
    while(currentLineNumber <= lineNumber) {
        if(currentLineNumber === lineNumber) {
            return positionInDocString + cursorPosition;
        }
        positionInDocString = positionInDocString+1;
        if(doc.charAt(positionInDocString) === '\n') {
            currentLineNumber = currentLineNumber+1;
        }
    }
}
//TODO scrappy. fix if time permits
// var line_counter = editor.lineCount();

function swipeOnF(direction) {
    editor.focus();
    var currentPosition = editor.getCursor();
    if ( direction === D.LEFT && currentPosition.ch > 0) {
        editor.setCursor({line: currentPosition.line, ch: currentPosition.ch-1});
    } else if (direction === D.RIGHT) {
        editor.setCursor({line: currentPosition.line, ch: currentPosition.ch+1});
    } else if (direction === D.UP) {
        if (currentPosition.line > 0) {
            editor.setCursor({line: currentPosition.line-1, ch: currentPosition.ch});
        }
    } else {
        if(currentPosition.line < editor.lineCount()) {
            editor.setCursor({line: currentPosition.line+1, ch: currentPosition.ch});
        }
    }
}

function swipeOnFD(direction) {
    editor.focus();
    var doc = editor.getValue();
    var cursorPosition = editor.getCursor().ch;
    if (direction === D.RIGHT) {
        console.log("right");
        for (let i = cursorPosition; i < doc.length; i++) {
            if (doc.charAt(i) === '\n') {
                console.log("NEWLINE");
            }
            if (doc.charAt(i) === '!' || doc.charAt(i) === '.' || doc.charAt(i) === '?') {
                editor.setCursor({line: 0, ch: i});
                break;
            }
        }
    } else if (direction === D.LEFT) {
        console.log("left");
        for (let i = cursorPosition; i >= 0; i--) {
            console.log("iterating");
            if (doc.charAt(i-1) === '\n') {
                console.log("NEWLINE");
            }
            if (doc.charAt(i) === '!' || doc.charAt(i) === '.' || doc.charAt(i) === '?') {
                editor.setCursor({line: 0, ch: i});
                break;
            } else if (i == 0) {
                editor.setCursor({line: 0, ch: i});
            }
        }
    } else if (direction === D.DOWN) {
        console.log("down");
        for (let i = cursorPosition; i < doc.length; i++) {
            if (doc.charAt(i-1) === '\n') {
                console.log("NEWLINE");
            }
            if (doc.charAt(i) === '!' || doc.charAt(i) === '.' || doc.charAt(i) === '?') {
                editor.setCursor({line: 0, ch: i});
                break;
            }
        }
    } else if (direction === D.UP) {
        console.log("up", cursorPosition);
        for (let i = cursorPosition; i >= 0; i--) {
            console.log("iterating");
            if (doc.charAt(i) === '\n') {
                console.log("NEWLINE");
            }
            if (doc.charAt(i) === '!' || doc.charAt(i) === '.' || doc.charAt(i) === '?') {
                console.log("in up");
                editor.setCursor({line: 0, ch: i-1});
                break;
            } else if (i == 0) {
                console.log("go to beginning");
                editor.setCursor({line: 0, ch: i});
            }
        }
    }
    console.log(doc);
}

function swipeOnFDS(direction) {
    editor.focus();
    var doc = editor.getValue();
    var cursorPosition = editor.getCursor().ch;

    // const cursor = cm.getCursor();
    console.log(getPositionInDocString(cursorPosition, editor.getCursor().line));
    console.log(doc.length);
    var positionInDoc = getPositionInDocString(cursorPosition, editor.getCursor().line);
    var prev_newline = false
    if(positionInDoc != 0 && doc.charAt(positionInDoc-1) === '\n') {
        prev_newline = true;
    }
    var curr_line = editor.getCursor().line;
    if(direction === D.DOWN || direction === D.RIGHT) {
        for(let i = positionInDoc; i < doc.length; i++) {
            if(prev_newline && doc.charAt(i) === '\n') {
                editor.setCursor({line: curr_line, ch: 0});
                return;
            }
            if(doc.charAt(i) === '\n') {
                console.log("line updated", curr_line);
                curr_line = curr_line+1;
                prev_newline = true;
            } else {
                prev_newline = false;
            }
        }
        editor.setCursor({line: editor.lineCount()-1, ch: 0});
    } else if(direction === D.UP || direction === D.LEFT) {
        for(let i = positionInDoc; i > 0; i--) {
            if(prev_newline && doc.charAt(i) === '\n') {
                editor.setCursor({line: curr_line, ch: 0});
                return;
            }
            if(doc.charAt(i) === '\n') {
                console.log("line updated", curr_line);
                curr_line = curr_line-1;
                prev_newline = true;
            } else {
                prev_newline = false;
            }
        }
        editor.setCursor({line: 0, ch: 0});
    }
    // STATUS_CURRENT_LINE.textContent = cursor.line + 1;
    // if (direction === D.RIGHT) {
    //     for(let i = cursorPosition; )
    // }
}
function swipeOnFDSA(direction) {
    editor.focus();
    var doc = editor.getValue();
    var cursorPosition = editor.getCursor().ch;
    var currLine = editor.getCursor().line;
    // const cursor = cm.getCursor();
    console.log(getPositionInDocString(cursorPosition, currLine));
    console.log(doc.length);
    var positionInDoc = getPositionInDocString(cursorPosition, editor.getCursor().line);
    
    if (direction === D.UP || direction === D.LEFT) {
        editor.setCursor({line: 0, ch: 0});
    } else {
        // for(let i = 0; i < positionInDoc; i++) {
        //     if(doc.charAt(i) === '\n') {
        //         console.log("line updated", currLine);
        //         currLine = currLine+1;
        //     } else if (doc.charAt(i) === '\0') {
        //         editor.setCursor({line: currLine, ch: 0});
        //     }
        // }
        editor.setCursor({line: editor.lineCount()-1, ch: 0});
    }
}
function addCharacterAtCursor(character) {
    return null;
    // editor.focus();
    // var doc = editor.getDoc();
    // var cursor = doc.getCursor();
    // var pos = {
	// 	line: cursor.line
	// };
    // var cursor_position = editor.getCursor().ch;
    // var next_cursor_position = cursor_position+1;
    // var line = editor.getCursor().line;
    // editor.replaceRange(character, {line, cursor_position}, {line, next_cursor_position});
    // editor.setCursor({line: 0, ch: editor.getCursor().ch+1});
    // const state = editor.current.view.viewState.state;
    // console.log("state", state);
    // const range = state.selection.ranges[0];
    // console.log("range", range);
    // editor.current.view.dispatch({
    //     changes: {
    //         from: range.from,
    //         to: range.to,
    //         insert: `${character}`
    //     },
    //     selection: {anchor: range.from + selection}
    // })
}

function addNewLine() {
    editor.focus();
    var doc = editor.getDoc();
    console.log(doc);
    var cursor = editor.getCursor();
    var line = cursor.line;
    editor.replaceRange("\n", {line})
    // var cursor = editor.getCursor()
    editor.setCursor({line: cursor.line+1, ch: cursor.ch});
}


function performGesture(gestureNum) {
    switch (gestureNum) {
        case 0:
            swipeOnF();
            break;
        case 16:
            addCharacterAtCursor('a');
            break;
        case 17:
            addCharacterAtCursor('b');
            break;
        case 18:
            addCharacterAtCursor('c');
            break;
        case 19:
            addCharacterAtCursor('d');
            break;
        case 20:
            addCharacterAtCursor('e');
            break;
        case 21:
            addNewLine();
            break;
        case 22:
            addCharacterAtCursor('f');
            break;
        case 23:
            addCharacterAtCursor('g');
            break;
        case 24:
            addCharacterAtCursor('h');
            break;
        case 44:
            swipeOnF(D.DOWN);
            break;
        case 45:
            swipeOnFD(D.DOWN);
            break;
        case 46:
            swipeOnFDS(D.DOWN);
            break;
        case 47:
            swipeOnFDSA(D.DOWN);
            break;
        case 48:
            swipeOnF(D.LEFT);
            break;
        case 49:
            swipeOnFD(D.LEFT);
            break;
        case 50:
            swipeOnFDS(D.LEFT);
            break;
        case 51:
            swipeOnFDSA(D.LEFT);
            break;
        case 52:
            swipeOnF(D.RIGHT);
            break;
        case 53:
            swipeOnFD(D.RIGHT);
            break;
        case 54:
            swipeOnFDS(D.RIGHT);
            break;
        case 55:
            swipeOnFDSA(D.RIGHT);
            break;
        case 56: 
            swipeOnF(D.UP);
            break;
        case 57:
            swipeOnFD(D.UP);
            break;
        case 58:
            swipeOnFDS(D.UP);
            break;
        case 59:
            swipeOnFDSA(D.UP);
            break;
    }
}
