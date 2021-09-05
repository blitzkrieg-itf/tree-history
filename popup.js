var now = Date.now();
localStorage.setItem('time', now);
var tree_dict_arr = []
localStorage.setItem("tree_dict_arr", JSON.stringify(tree_dict_arr));
// chrome.tabs.query({}, function (tabs) {
//     $('#tabnum').text('現在開いているタブの数は[' + tabs.length + ']個です');
//     $("#extention-id").text(chrome.runtime.id);

//     for (var i in tabs) {
//         $('tbody').after('<tr><td>' + tabs[i].title + '</td><td>' + tabs[i].url + '</td></tr>');
//     }
// });

$('#search-link').attr("href", "chrome-extension://"+chrome.runtime.id+"/index.html");