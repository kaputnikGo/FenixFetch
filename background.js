function openTab() {
  browser.tabs.create({
	url: "options.html",
  });
}
browser.action.onClicked.addListener(openTab);
