//variables

let noteDisplayName, noteDisplayContent, count;
const $ = document,
  addNoteBtn = $.getElementById("add-note"),
  addNotePopup = $.getElementById("add-note-popup"),
  saveNoteBtn = $.getElementById("save-note"),
  discardNoteBtn = $.getElementById("discard-note"),
  noteContentTxtarea = $.getElementById("note-content"),
  noteNameInp = $.getElementById("note-name"),
  notePlayGround = $.getElementById("note-playground"),
  noteDeleteBtns = $.getElementsByClassName('delete-note');

//Show previous notes or you don't have a note message

if (localStorage.length == 0) {
  localStorage.setItem("count", 1);
} else {
  for (i = 1; i < localStorage.getItem("count"); i++) {
    notePlayGround.innerHTML += `
    <div id="noteName${i}" class="w-2/3 h-max sm:w-1/4 bg-gray-200 py-4 px-4 rounded-md shadow-lg m-2 space-y-8">
      <div class="relative w-full flex p-1 items-center">
        <span>
          ${ localStorage.getItem("noteName" + i) }
        </span>
        <button class="delete-note absolute right-0 p-2
        cursor-pointer bg-transparent border-dashed rounded-md m-2 bg-white shadow-md hover:shadow-lg">
          <ion-icon name="trash" ></ion-icon>
        </button>
      </div>

      <div class="bg-white border-dashed border-black rounded-md p-4 shadow-md">
        ${ localStorage.getItem("noteContent" + i) }
      </div>

    </div>
    `
  }
}

//show note create popup
addNoteBtn.addEventListener("click", () => {
  addNotePopup.style.left = 0;
});

// discard note
const discardNote = () => {
  noteNameInp.value = "";
  noteContentTxtarea.value = "";
  addNotePopup.style.left = "-200%";
};


discardNoteBtn.addEventListener("click", discardNote);


//save note

const saveNoteOnWeb = () => {
  if (noteNameInp.value == "" || noteContentTxtarea == "") {
    return false;
  } else {
    count = localStorage.getItem('count');
    localStorage.setItem("noteName" + count, noteNameInp.value);
    localStorage.setItem("noteContent" + count, noteContentTxtarea.value);
    count++;
    localStorage.setItem("count", count);
    addNotePopup.style.left = "-200%";
    location.reload()
  }

};

saveNoteBtn.addEventListener("click", saveNoteOnWeb);

$.addEventListener("keydown", ({ ctrlKey, key }) => {
  if (ctrlKey && key === "z") discardNote()
  else if (ctrlKey && key === "c") saveNoteOnWeb();
});

if (noteDeleteBtns.length) {
  for (let i = 0; i < noteDeleteBtns.length; i++) {
    noteDeleteBtns[i].addEventListener("click", () => {
      let el = noteDeleteBtns[i].parentElement.parentElement;
      el.remove();
      localStorage.removeItem(el.id);
      localStorage.removeItem(`noteContent${el.id[el.id.length - 1]}`);
      count = localStorage.getItem("count");
      count--;
      localStorage.setItem("count", count);
      location.reload()
    });
  }
}
