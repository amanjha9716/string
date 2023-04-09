const socket = io('https://string-noe6.onrender.com');

const audio= new Audio('sms_tone.mp3');
const form= document.querySelector("#send-container");
const chatsec=document.querySelector(".chat");
const names=document.querySelector('.names');
const messageinput=document.querySelector("#message");
const myname=document.querySelector('.my-name');
var element = document.getElementsByClassName("chat");
element.scrollTop = element.scrollHeight;
function updateScroll(){
    var element = document.getElementsByClassName("chat");
    element.scrollTop = element.scrollHeight;
}
// for adding name
const addname=(name)=>{
    myname.textContent=name;
};
//for appending new user
const append=(name)=>{
    names.innerHTML+=` <div class="member flex items-center py-3  ">
                            <img class="rounded-full h-14 w-14 mx-3 "src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhMSExITERUXEw8QFhAXEBUSExAYFxIWGxYWExMaHSggGRomHRUTIjMhMSkrMC4uGB8zODM4NygtLisBCgoKDg0OGw8QGislHiUrLS81Ky0tLS0tLS4tLS0tLi0uLS0uLS0tLS0tLS0tLS0tLS0rLS0xKy0tLS0tLTctLf/AABEIASsAqAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xAA+EAACAgECAwUGAggFBAMAAAABAgADEQQhBRIxBgdBUWETIjJxgZEjoVKCkqKxwdHwFDNCYvEkQ1SyFRYX/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAhEQEAAwACAgIDAQAAAAAAAAAAAQIRAxIhQTFREyJhMv/aAAwDAQACEQMRAD8A5RERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREp32hRn7Dzge2YDqQJCWA9CD9Za8N4dqNZaKqa2usbOEUdB4knooHmdpW492e1WidU1NLUsw5lyVZWHjyupIOPEZ2yI0x7a5R1YfeFuU9GH3nQu6DTcM1itptRpKjqEHOrlnPt08TgtgMu2QMZBzjYx3w6DhmiRKKNJWuosHtOcPYBTXkjm5ebBZiCBkHofSY7/t1xvp41z9mA6kD6yQZjdDw+68laarLmAyVrrawgeZCg7TwjtWxBBBBIKkYII6gjwM2wysTxXYGGRPUomJEQJiRECYkRAmIiQIiICIkE4gTJo4VZqra6asc7FgOZuVRhSzMzeAAUknyEy+h7Ka+5eavR3sp6Ma/Zg+oL4yPWdC7vOxFmkd9br+WkVoxWsurco6vZaVJAAA2GfPMza0RDVaTMs93d9kToKCE5PaWYNmpdGJfHRKq8qRWPMkEnJ5cYmU7V9mv8dp2otZLB8Snk9m9bDo1T5OD12IIPTI6zQePd9wVyuk04dQcC65iOffqKl3A8stn0Et+E9+L8wGp0ilc7tS5DKPRHJD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" alt="">
                            ${name}
                        </div>`
    let messdata=document.createElement('div');
    messdata.classList.add("right","float-right", "clear-left","clear-right",  "p-3", "bg-gray-100", "m-3", "block", "rounded-xl" ,"shadow-xl");
    let innerhtml=`
                <div class="message text-muted">
                    ${name} has joined the chat
                </div>`;
    messdata.innerHTML=innerhtml;
    chatsec.append(messdata);
    setInterval(updateScroll,1000);
    audio.play();
}
//user left
const leftmessage=(name)=>{
    let messdata=document.createElement('div');
    messdata.classList.add();
    let innerhtml=`<div class="message text-muted right float-right clear-left clear-right p-3 bg-gray-100 m-3 block rounded-xl shadow-xl">
                    ${name} has left the chat
                </div>`;
    messdata.innerHTML=innerhtml;
    chatsec.append(messdata);
    setInterval(updateScroll,1000);
}
// for appending message

const appendright=(message,name)=>
{
    let messdata=document.createElement('div');
    messdata.classList.add("right","float-right", "clear-left","clear-right",  "p-3", "bg-gray-100", "m-3", "block", "rounded-xl" ,"shadow-xl");
    let innerhtml=`<div class="name  text-muted  block  text-sm block">                   
                    ${name}
                </div>                
                <div class="message">
                    ${message}
                </div>`;
    messdata.innerHTML=innerhtml;
    chatsec.append(messdata);
    audio.play();
    setInterval(updateScroll,1000);
}
//apne message ko show karne ke liye
const appendleft=(message)=>
{
    let messdata=document.createElement('div');
    messdata.classList.add("left","float-left","clear-right","p-3","bg-gray-100", "m-3", "block", "rounded-xl" ,"shadow-xl");
    let innerhtml=`<div class="name  text-muted  block  text-sm block">
                    me
                </div>
                <div class="message">
                    ${message}
                </div>`;
    messdata.innerHTML=innerhtml;
    chatsec.append(messdata);
    setInterval(updateScroll,1000);
};
const name = prompt("enter you name");
addname(name);
socket.emit('new-user', name);

socket.on('user-joined',name=>{
    
    append(name);

});
socket.on('recieve',(data)=>{
    appendright(data.message,data.name);
    console.log(data);
});
socket.on('left',(name)=>{
    leftmessage(name);
});
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    messageinput.value='';
    appendleft(message);
    socket.emit('send',message);
});