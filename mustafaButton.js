function mustafaButton(n){
    var wrapper = document.createElement('div');
        wrapper.id = n.idName;
        wrapper.style.zIndex = n.zIndex;
        wrapper.style.width = n.size + 'px';
        wrapper.style.height = n.size + 'px';
        wrapper.style.position = n.position;
        wrapper.style.top = n.top;
        wrapper.style.left = n.left;
        wrapper.style.overflow = "hidden";
            var line1 = document.createElement('div');
            var line2 = document.createElement('div');
            var line3 = document.createElement('div');
                line1.id = n.idName+"line1"; line2.id = n.idName+"line2"; line3.id = n.idName+"line3";
        wrapper.appendChild(line1);
        wrapper.appendChild(line2);
        wrapper.appendChild(line3);
        document.querySelector(n.place).appendChild(wrapper);
    for(i = 1; i <= 3; i++){
        document.getElementById(n.idName+'line'+i).style.left = 0;
        document.getElementById(n.idName+'line'+i).style.width = n.size*0.8 + "px";
        document.getElementById(n.idName+'line'+i).style.position = 'relative';
        document.getElementById(n.idName+'line'+i).style.height = n.size*0.1 + "px";
        document.getElementById(n.idName+'line'+i).style.background = n.color;
        document.getElementById(n.idName+'line'+i).style.margin = n.size*0.2 + "px";
        document.getElementById(n.idName+'line'+i).style.transition = n.speed + "s";
        document.getElementById(n.idName+'line'+i).style.pointerEvents = "none";
    }
    var stage = 0;
    document.getElementById(n.idName).onclick = function(){
        if(stage == 0){
            document.getElementById(n.idName+'line2').style.left = -n.size + 'px';
            document.getElementById(n.idName+'line1').style.transform = 'rotate(45deg) translate(' + n.size*0.2 + 'px, ' + n.size*0.2 + 'px)';
            document.getElementById(n.idName+'line3').style.transform = 'rotate(-45deg) translate(' + n.size*0.225 + 'px, -' + n.size*0.222 + 'px)';
            stage = 1;
        }
        else{
            document.getElementById(n.idName+'line2').style.left = 0;
            document.getElementById(n.idName+'line1').style.transform = 'rotate(0deg) translate(0, 0)';
            document.getElementById(n.idName+'line3').style.transform = 'rotate(0deg) translate(0, 0)';
            stage = 0;
        }
    }
}



function runMustafaBtn(){
    var btnProperties = ({
        zIndex: 10,
        position: 'relative',
        idName: "nav-button-mobile",
        place: '#nav-container',
        color: '#aaa',
        size: 50,
        top: '0',
        left: '0',
        speed: 0.3
    });
    mustafaButton(btnProperties);
}
runMustafaBtn();