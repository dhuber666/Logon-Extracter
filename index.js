const textbox = document.getElementById("textArea");

const output = document.getElementById("output");

// matches just the value + paranthesis
const regex1 = /[u+v+]\d+/g;

// global array with matches
let matches = [];

const onTextChange = e => {
  setTimeout(() => {
    pastedText = e.target.value.toLowerCase();

    // e.target.value.match(regex1)
    foundLogons = pastedText.match(regex1);
    console.log("found logons", foundLogons);

    matches = matches.concat(foundLogons);

    renderTextArea();
  }, 100);
};

const getSelectionText = () => {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text.trim();
  }

  if (!text.replace(/\s/g, "").length) {
    // string only contained whitespace (ie. spaces, tabs or line breaks)
    return;
  }

  // else push the marked text into the array
  //   debugger;
  text ? matches.push(text.trim()) : null;
  renderTextArea();
};

const renderTextArea = () => {
  console.log(matches);
  output.value = matches.join("\n");
};

// Event Listener
textbox.addEventListener("dblclick", getSelectionText);
textbox.addEventListener("paste", onTextChange);
