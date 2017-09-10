
class stickyHelper {
    constructor() {
        this.saveInd = 0;
    }

    saveToJson(text, namePrefix) {
        this.saveInd++;
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(text)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = namePrefix + "_" + (new Date()).yyyymmdd() + "_" + ('000' + this.saveInd).substr(-3) + ".json";
        a.click();
    }

    loadFromJson(jsonFileName, stickyElement) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonFileName, true);
        var _stickyHelper = this;
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                _stickyHelper.createStickys(stickyElement, xobj.responseText);
            }
        };
        xobj.send(null);
    }

    addSticky(stickiesElement, title, desc, ulElem) {
        if(!ulElem)
        {
            ulElem = stickiesElement.querySelector("ul.stickWString");
            if(!ulElem) {
                ulElem = document.createElement('ul');
                ulElem.setAttribute('class','stickWString');
                stickiesElement.appendChild(ulElem);
            }
        }
        //create sticky (li element) 
        var li = document.createElement('li');
        ulElem.appendChild(li);
        //create sticky content (a)
        var a = document.createElement('a');
        a.setAttribute('href','#');
        a.innerHTML="<h2>" + title + "</h2><p>" + desc + "</p>";
        li.appendChild(a);
    }

    createStickys(stickiesElement, stickyJson) {
        var stickies = JSON.parse(stickyJson);
        if(stickies && stickies.length > 0) {
            var ulElem = stickiesElement.querySelector("ul.stickWString");
            if(!ulElem) {
                ulElem = document.createElement('ul');
                ulElem.setAttribute('class','stickWString');
                stickiesElement.appendChild(ulElem);
            }
            for(var i=0; i<stickies.length; i++)
                this.addSticky(stickiesElement,
                            stickies[i].title ? stickies[i].title : "",
                            stickies[i].desc ? stickies[i].desc : "",
                            ulElem);
        }
    }
}
