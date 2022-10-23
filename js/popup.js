// 現在のページにあるリンクの大きさを全てリセットする
const pageClearButton = document.getElementById('pageClearButton')

const onClickpageClearButton = () => {
    console.log('pageClearButtonが押されました');

    const result = confirm('現在のページのカーソルの大きさをリセットしますか');
    if (result) {
        console.log('OKが押されました');

        let getCurrentTab = async () => {
            let queryOptions = { active: true, lastFocusedWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            console.log(tab);
            console.log(tab.url);
    
            // chrome.storage.removeはデータの1番上の階層にあるデータ(ここでは{currentUrl})しかkeyを参照することができないっぽい。
            chrome.storage.local.remove(tab.url, () => {
                console.log('removeした');
            });
    
            return tab;
        }
        getCurrentTab();
    
        chrome.tabs.reload();
       
    } else {
        console.log('キャンセル押されました');
    }

};
pageClearButton.addEventListener('click', onClickpageClearButton);


// 全てのカーソルの大きさをリセット
const clearButton = document.getElementById('clearButton')

const onClickclearButton = () => {
    console.log('clearButtonが押されました');

    const result = confirm('全てのカーソルの大きさをリセットしますか');
    if (result) {
        console.log('OKが押されました');
        chrome.storage.local.clear();
        chrome.tabs.reload();
    } else {
        console.log('キャンセル押されました');
    }
    
};
clearButton.addEventListener('click', onClickclearButton);