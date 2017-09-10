
var stickyColors =
    {
        color1: '#ffc',
        color2: '#cfc',
        color3: '#ccf',
        color4: '#fcc',
    }

class stickyHelper {
    constructor(stickiesElem, hasStrings) {
        this.saveInd = 0;
        this.hasStrings = hasStrings;
        this.stickiesElem = stickiesElem;

        if(this.hasStrings) {
            var svgDiv = document.createElement('div');
            svgDiv.setAttribute('class','stickWString');
            this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgDiv.appendChild(this.svg);
            this.stickiesElem.appendChild(svgDiv);

            var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
            this.svg.append(defs);
            var markerCircle = document.createElementNS('http://www.w3.org/2000/svg','marker');
            markerCircle.setAttribute('id', 'markerCircle');
            markerCircle.setAttribute('markerWidth', '8');
            markerCircle.setAttribute('markerHeight','8');
            markerCircle.setAttribute('refX','5');
            markerCircle.setAttribute("refY", "5");
            defs.append(markerCircle);
            var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
            circle.setAttribute('cx', '5');
            circle.setAttribute('cy', '5');
            circle.setAttribute('r', '3');
            circle.setAttribute('style','stroke: none; fill:#000000;');
            markerCircle.append(circle);

            var markerArrow = document.createElementNS('http://www.w3.org/2000/svg','marker');
            markerArrow.setAttribute('id', 'markerArrow');
            markerArrow.setAttribute('markerWidth', '13');
            markerArrow.setAttribute('markerHeight','13');
            markerArrow.setAttribute('refX','2');
            markerArrow.setAttribute("refY", "6");
            markerArrow.setAttribute("orient", "auto");
            defs.append(markerArrow);
            var path = document.createElementNS('http://www.w3.org/2000/svg','path');
            path.setAttribute('d', 'M2,2 L2,11 L10,6 L2,2');
            path.setAttribute('style','fill: #000000;');
            markerArrow.append(path);
        }
    }

    saveToJson(text, namePrefix) {
        this.saveInd++;
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(text)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = namePrefix + "_" + (new Date()).yyyymmdd() + "_" + ('000' + this.saveInd).substr(-3) + ".json";
        a.click();
    }

    loadFromJson(jsonFileName) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonFileName, true);
        var _stickyHelper = this;
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                _stickyHelper.createStickys(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    addSticky(title, desc, color, ulElem) {
        if(!ulElem)
        {
            ulElem = this.stickiesElem.querySelector("ul.stickWString");
            if(!ulElem) {
                ulElem = document.createElement('ul');
                ulElem.setAttribute('class','stickWString');
                this.stickiesElem.appendChild(ulElem);
            }
        }
        //create sticky (li element) 
        var li = document.createElement('li');
        ulElem.appendChild(li);
        //create sticky content (a)
        var a = document.createElement('a');
        a.setAttribute('href','#');
        if(!color)
            color = "color1";
        a.setAttribute('style', 'background: ' + stickyColors[color]);
        a.innerHTML="<h2>" + title + "</h2><p>" + desc + "</p>";
        li.appendChild(a);

        if(this.hasStrings)
            this.addStickyLine(li, color);
    }

    addStickyLine(li, color) {
        var line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1', li.offsetLeft + li.offsetWidth / 2);
        line.setAttribute('y1', li.offsetTop + 10);
        line.setAttribute('x2', li.offsetLeft + Math.random() * 200);
        line.setAttribute('y2', Math.random() * 200 + 500);
        line.setAttribute('stroke', stickyColors[color]);
        line.setAttribute("stroke-width", 3);
        line.setAttribute('marker-end', 'url(#markerArrow   )');
        this.svg.append(line);
    }

    createStickys(stickyJson) {
        var stickies = JSON.parse(stickyJson);
        if(stickies && stickies.length > 0) {
            var ulElem = this.stickiesElem.querySelector("ul.stickWString");
            if(!ulElem) {
                ulElem = document.createElement('ul');
                ulElem.setAttribute('class','stickWString');
                this.stickiesElem.appendChild(ulElem);
            }
            for(var i=0; i<stickies.length; i++)
                this.addSticky(stickies[i].title ? stickies[i].title : "",
                            stickies[i].desc ? stickies[i].desc : "",
                            stickies[i].color ? stickies[i].color : null, ulElem);
        }
    }
}
