'use strict';
document.addEventListener("DOMContentLoaded", () => {
    const size = 5;
    const difficulty = 4;
    const shufflecount = size * difficulty;
    const table = document.getElementById("table");
    const msgBox = document.getElementById("msgBox");
    const startBt = document.getElementById("startBt");
    let panels;//td要素を格納する配列
    let emptyIdx;//現在の空のインデックス

    const init = () => {
        console.log("in通過")
        panels = [];
        table.textContent = null;
        msgBox.textContent = null;
        createStage();
    }
    const createStage = () => {
        console.log("cr通過")
        for (let i = 0; i <size; i++) {
            const tr = document.createElement("tr");
            for (let j = 0; j <size; j++) {
                const td = document.createElement("td");
                let index=i*size+j;
                td.posId=index;
                td.textContent=index==size*size-1 ? "":index+1;
                if(index==size*size-1){
                    td.classList.add("empty");
                    emptyIdx=td.posId;
                }
                td.onclick=click;
                panels.push(td);
                tr.append(td);
            }
            table.append(tr);
        }
    }
    startBt.addEventListener("click",function(){
        init();
        for(let i=0;i<shufflecount;i++){
            const dir=Math.floor(Math.random()*4);//0↑,1→,2↓,3←
            switch(dir){
                case 0:
                    if(emptyIdx<size){continue;}
                    swap(emptyIdx-size,emptyIdx);
                    emptyIdx-=size;
                    break;
                case 1:
                    if(emptyIdx%size==(size-1)){continue;}
                    swap(emptyIdx+1,emptyIdx);
                    emptyIdx++;
                    break;
                case 2:
                    if(emptyIdx>=size*(size-1)){continue;}
                    swap(emptyIdx+size,emptyIdx);
                    emptyIdx+=size;
                    break;
                case 3:
                    if(emptyIdx%4==0){continue;}
                    swap(emptyIdx-1,emptyIdx);
                    emptyIdx--;
                    break;
            }

        }
        check();

    });
    const swap=(numPos,empPos)=>{
        console.log(numPos+","+empPos);
        panels[empPos].textContent=panels[numPos].textContent;
        panels[numPos].textContent="";

        panels[empPos].classList.remove("empty");
        panels[numPos].classList.add("empty");

    };
    const click=(e)=>{
        const pos=e.target.posId;
        if(pos>=size && panels[pos-size].textContent===""){
        swap(pos,pos-size);
        }else if(pos%size !==(size-1) && panels[pos+1].textContent===""){
        swap(pos,pos+1);
        }else if(pos<size*(size-1) && panels[pos+size].textContent===""){
        swap(pos,pos+size);
        }else if(pos%size !==0 && panels[pos-1].textContent===""){
        swap(pos,pos-1);
        }
        check();

    };
    const check=()=>{
        let okCount=0;
        for(let i=0;i<panels.length;i++){
            if(panels[i].posId === parseInt(panels[i].textContent)-1){
                panels[i].classList.add("ok");
                okCount++;
            }else{
                panels[i].classList.remove("ok");
            }
        }
        if(okCount===size*size-1){
            msgBox.textContent="Complete!"
        }
    }
    init();

});
