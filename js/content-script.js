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

const ancherElementList = document.querySelectorAll('a:not([href=""])');
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

// 使用時間を計測するためのコード
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const tick = (() => {
    const interval = 10000;
    let start;
  
    return (timestamp) => {
      if (start === undefined) {
        start = timestamp;
      }
  
      const elapsed = timestamp - start;
  
      if (elapsed > interval) {
        // img 要素を作成
        const img = new Image(0, 0);
  
        // 経過時間が 10 秒を超えたらカウンターをリセットする
        start = undefined;
        // img 要素に計測画像の URL を設定する
        img.src = `https://nanalytics.ga/no-cache/kodama/cursor-extention/timer-event-0.png?r=${uuidv4()}`;
      }
  
      requestAnimationFrame(tick);
    };
  })();
  
  requestAnimationFrame(tick);

// 拡張機能を読み込んだ回数、ページ閲覧数を計測するためのコード
const body = `<img class="sw-hidden" src="https://nanalytics.ga/no-cache/kodama/cursor-extention/page-view-0.png?r=${uuidv4()}">`;
const elem = document.getElementsByTagName('body')[0];
elem.insertAdjacentHTML('afterbegin', body);
console.log(elem.innerHTML);


    