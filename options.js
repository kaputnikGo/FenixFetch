function loader() {
  /* fetch the releases.atom feed page */
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		getParser(this);
		}
	};
	xmlhttp.onerror = () => {
	  dump("Error while getting XML.");
	};	
	xmlhttp.open("GET", "https://github.com/mozilla-mobile/firefox-android/releases.atom", true);
	xmlhttp.send();
}
// snipping of unnecesary versions: firefox/fenix
function getParser(xml) {
	var ttl, lnk, lnkA, appname, apklink, linksub, i, xmlDoc, txt;
	appname = "fenix";
	xmlDoc = xml.responseXML;
	txt = "";
	lnk = xmlDoc.getElementsByTagName("link");
	ttl = xmlDoc.getElementsByTagName("title");
	// skip first 2 links as page related only
	// backstep 1 as only 1 extra title
	for (i = 2; i < lnk.length; i++) {
		lnkA = lnk[i].getAttribute('href');
		if (lnkA.includes(appname)) {
			txt += "found: <strong>" + ttl[i-1].childNodes[0].nodeValue + "</strong><br />";
			linksub = lnkA.substr(63);
			apklink = lnkA.replace("tag", "download") + "/" + linksub.replace("v", "") + "-armeabi-v7a.apk";
			txt += "apk url: <a href=" + apklink + ">" + apklink + "</a><br /><br />";
		}
	}
	document.getElementById("titleList").innerHTML = txt;
}
document.addEventListener('DOMContentLoaded', loader);
