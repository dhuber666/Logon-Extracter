const textbox = document.getElementById("textArea");

const output = document.getElementById("output");

const download = document.getElementById("save");

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

// saving to file

// Function to download data to a file
function save(data, filename, type) {
  var text = data.replace(/\n/g, "\r\n");
  var file = new Blob([text], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

// Event Listener
download.addEventListener("click", () =>
  save(output.value, "names.txt", "text")
);
textbox.addEventListener("dblclick", getSelectionText);
textbox.addEventListener("paste", onTextChange);
