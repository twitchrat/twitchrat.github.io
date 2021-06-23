class Color {
    constructor(template, col) {
        this.template = template;
        this.col = col;
    }

    apply(word) {
        return this.template.replace("{}", word);
    }

    html(word) {
        return '<span style="color:' + this.col + '">' + this.apply(word) + '</span>';
    }
}


let YELLOW = new Color("&lt;system&gt;{}&lt;/&gt;", "yellow");
let BLUE = new Color("&lt;team&gt;{}&lt;/&gt;", "blue");
let RED = new Color("&lt;enemy&gt;{}&lt;/&gt;", "red");
let PINK = new Color("&lt;warning&gt;{}&lt;/&gt;", "pink");
let GREEN = new Color("&lt;notification&gt;{}&lt;/&gt;", "green");
let WHITE = new Color("{}", "white");

let rainbow = [YELLOW, BLUE, RED, PINK, GREEN];
let trans = [BLUE, PINK, WHITE, PINK, BLUE];

function colorfy(text, pattern) {
    // get input
    let delim = document.getElementById("delim").value;
    let patternIndex = 0;
    let colorParagraphs = [''];
    let paragraphIndex = 0;
    let runningLen = 0;
    // if msg.len > 15 * 50 (out of characters)

    for (let word of text.split(delim)) {
        let color = pattern[patternIndex % pattern.length];
        let w = word + delim;
        let len = color.apply(w).length;
        if (runningLen + len > 15 * 50) {
            runningLen = 0;
            paragraphIndex += 1;
            colorParagraphs[paragraphIndex] = '';
        }
        runningLen += len;
        colorParagraphs[paragraphIndex] += color.html(w);
        patternIndex += 1;
    }
    let coloredText = colorParagraphs.join("<br><br>");
    output(coloredText);
}

function output(html) {
    document.getElementById("output").innerHTML = html;
}

function input() {
    return document.getElementById("input").value;
}

function blueify() {
    output(BLUE.html(input()));
}
function redify() {
    output(RED.html(input()));
}
function greenify() {
    output(GREEN.html(input()));
}
function yellowify() {
    output(YELLOW.html(input()));
}
function pinkify() {
    output(PINK.html(input()));
}
function transify() {
    colorfy(input(), trans);
}
function rainbowify() {
    colorfy(input(), rainbow);
}


function select() {
  window.getSelection()
    .selectAllChildren(
      document.getElementById("output") 
    );
}

