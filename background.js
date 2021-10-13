//async function getCurrentTab() {
//  let queryOptions = { active: true, currentWindow: true };
//  let [tab] = await chrome.tabs.query(queryOptions);
//  return tab;
//}
//
//var currentTab = getCurrentTab();
//console.log(currentTab);

//chrome.history.onVisited.addListener(
//    function (historyitem) {
//        console.log("visitURL");
//        console.log(historyitem.url);
//    }
//
//)
var preURL = "";
var nowURL = "";
var preTitle="";
var nowTitle = "";
var nowFavicon="";
function tree_register(preURL, nowURL, nowTitle, nowFavicon) {
    var tree_dict_arr = JSON.parse(localStorage.getItem("tree_dict_arr"));
    var tree_dict = { from: preURL, to: nowURL, arrows: 'to', title: nowTitle, favicon:nowFavicon};
    console.log(tree_dict_arr)
    tree_dict_arr.push(tree_dict);    
    localStorage.setItem("tree_dict_arr", JSON.stringify(tree_dict_arr));
    console.log(JSON.stringify(tree_dict_arr));
}

//タブが切り替わった時に発火
chrome.tabs.onActivated.addListener(
    function (activeinfo) {
        chrome.tabs.get(activeinfo["tabId"],
            function (tabinfo) {
                console.log("activated");
                console.log(tabinfo);
                //console.log(tabinfo);
                if (tabinfo.url != undefined) {
                    preURL = nowURL;
                    //preTitle = nowTitle;
                    nowURL = tabinfo.url;
                    nowTitle = tabinfo.title;
                    nowFavicon = tabinfo.favIconUrl;
                    //tree_register(preURL, nowURL, nowTitle);
                }
            }
        )
    }
)

//タブが生成された時に発火
var onCreatedFlag = false
chrome.tabs.onCreated.addListener(
    function (tab) {
        console.log("created");
        
        //console.log(tab.pendingUrl);
        onCreatedFlag = true;
        

    }
)

//既存タブが更新された時に発火
chrome.tabs.onUpdated.addListener(
    function (tabid, changeInfo, tab) {
        if (changeInfo.status == "complete") {
            if (!onCreatedFlag) {
                console.log("updated")
                console.log(changeInfo)
                console.log(tab.url)
                console.log(tab.title)
                if (tab.url != undefined) {
                    preURL = nowURL;
                    //preTitle = nowTitle;
                    nowURL = tab.url;
                    nowTitle = tab.title;
                    nowFavicon = tab.favIconUrl;
                    if (preURL==nowURL){
                        return;
                    }
                    else{
                        tree_register(preURL, nowURL, nowTitle, nowFavicon);
                    }

                }
            } else {
                if (tab.url != undefined) {
                    console.log(tab);
                    console.log("preURL");
                    console.log(preURL);
                    console.log("nowURL");
                    console.log(nowURL);
                    console.log("tab.url");
                    console.log(tab.url);
                    // nowFavicon = tab.faviconUrl;
                    if (preURL==nowURL){
                        return;
                    }
                    else{
                        tree_register(preURL, nowURL, nowTitle, nowFavicon);
                    }
                }
            }
            onCreatedFlag = false
        }
    }
)

