/*

//chrome.storage.local.clear();
let data = {};
console.log(window.location.href);

const imagePath = '../images/cursor1.svg';
const src = chrome.runtime.getURL(imagePath);

let img;
function preload() {
    img = loadImage(src);
    console.log(img);
}

function setup() { 
    document.body.insertAdjacentHTML('afterbegin', '<div id="p5Canvas"></div>');
    let canvas = createCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
    canvas.parent('p5Canvas');

    // 画像の初期サイズ
    let corsorX = 18;
    let corsorY = 30;
    img.resize(corsorX, corsorY);

    chrome.storage.local.get(null, (result) => {
        data = result;
        console.log(result);
        for(const key in data) {
            console.log(key);
            if(key === window.location.href && data[key].count > 0){
                // 画像のサイズの計算方法
                img.resize(Math.min(img.width*8, corsorX*data[key].count), Math.min(img.height*8, corsorY*data[key].count));
                //img.resize(Math.min(img.width*8, img.width*data[key].count), Math.min(img.height*8, img.height*data[key].count));
                //img.resize(img.width*8, img.height*8)
            } 
        }
    });

    const ancherElementList = document.querySelectorAll('a:not([href=""]');
    console.log(ancherElementList);
    ancherElementList.forEach((ancherElement) => {
        ancherElement.addEventListener('click', (e) => {
            
            const { currentTarget } = e;
            const url =currentTarget.href;
            e.preventDefault();
            if(data.hasOwnProperty(url)){
                data[url].count += 1;
            } else {
                data[url] = {};
                data[url].count = 1;
            }
            chrome.storage.local.set(data, () => {
                console.log('Value is set to ' , data);
            });
            if(url.indexOf('http') === 0){
                window.location.href = currentTarget;
            }
        });
    });
};

function draw() { 
    clear();
    background('rgba(0, 0, 0, 0.3)');
    image(img, mouseX, mouseY);
}

*/

//chrome.storage.local.clear();
let data = {};

const imagePath = '../images/cursor1.svg';
const src = chrome.runtime.getURL(imagePath);

const img = document.createElement('img');
img.id = 'stalker';
img.src = src;
document.body.appendChild(img);       

const stalker = document.getElementById('stalker');
console.log(stalker);

document.addEventListener('mousemove', (e) => {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

// 画像の初期サイズ
const corsor = 16;

stalker.style.width = `${corsor}px`;

chrome.storage.local.get(null, (result) => {
    data = result;
    console.log(result);
    for(const key in data) {
        console.log(key);
        if(key === window.location.href && data[key].count > 0){
            // 画像のサイズの計算方法
            stalker.style.width = `${Math.min(corsor*30, corsor*data[key].count)}px`
        } 
    }
});

const ancherElementList = document.querySelectorAll('a:not([href=""]');
    console.log(ancherElementList);
    ancherElementList.forEach((ancherElement) => {
        ancherElement.addEventListener('click', (e) => {
            
            const { currentTarget } = e;
            const url =currentTarget.href;
            e.preventDefault();
            if(data.hasOwnProperty(url)){
                data[url].count += 1;
            } else {
                data[url] = {};
                data[url].count = 1;
            }
            chrome.storage.local.set(data, () => {
                console.log('Value is set to ' , data);
            });
            if(url.indexOf('http') === 0){
                window.location.href = currentTarget;
            }

        });
    });