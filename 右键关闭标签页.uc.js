//右键关闭标签页
    gBrowser.tabContainer.addEventListener("click",
    function(event) {
        if (event.target.localName == "tab" && event.button == 2 && !event.ctrlKey) {
            gBrowser.removeTab(event.target);
            event.stopPropagation();
            event.preventDefault();
        }
    },
	false);