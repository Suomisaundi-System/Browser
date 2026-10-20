// Browser detection is best-effort: UA strings may be reduced, spoofed or absent.
// Prefer capability tests for behavior, not browser-name allowlists.
export function detectBrowser({ua=globalThis.navigator?.userAgent||"",brands=globalThis.navigator?.userAgentData?.brands||[]}={}){
 const rules=[
  ["Samsung Internet",/SamsungBrowser\/([\d.]+)/i],
  ["Opera",/(?:OPR|Opera)\/([\d.]+)/i],
  ["Opera GX",/OPRGX\/([\d.]+)/i],
  ["Edge",/(?:Edg|EdgA|EdgiOS)\/([\d.]+)/i],
  ["Brave",/Brave\/([\d.]+)/i],
  ["Vivaldi",/Vivaldi\/([\d.]+)/i],
  ["Yandex",/YaBrowser\/([\d.]+)/i],
  ["DuckDuckGo",/DuckDuckGo\/([\d.]+)/i],
  ["Firefox",/(?:Firefox|FxiOS)\/([\d.]+)/i],
  ["Chrome",/(?:Chrome|CriOS)\/([\d.]+)/i],
  ["Safari",/Version\/([\d.]+).*Safari/i],
  ["Internet Explorer",/(?:MSIE |rv:)([\d.]+)/i]
 ];
 let name="Unknown",version=null;
 for(const [candidate,re] of rules){const m=ua.match(re);if(m){name=candidate;version=m[1];break;}}
 if(name==="Chrome"&&/Arc\//i.test(ua))name="Arc";
 if(name==="Chrome"&&/Whale\//i.test(ua))name="Whale";
 if(name==="Chrome"&&/UCBrowser\//i.test(ua))name="UC Browser";
 if(name==="Chrome"&&/Puffin\//i.test(ua))name="Puffin";
 const brandNames=brands.map(x=>x.brand).filter(x=>!/Not.?A.?Brand/i.test(x));
 const platform=/Android/i.test(ua)?"Android":/iPad|iPhone|iPod/i.test(ua)?"iOS":/Windows/i.test(ua)?"Windows":/Macintosh|Mac OS/i.test(ua)?"macOS":/Linux/i.test(ua)?"Linux":"Unknown";
 const engine=/Firefox\//i.test(ua)?"Gecko":/AppleWebKit/i.test(ua)?(/Chrome|Chromium|Edg|OPR/i.test(ua)?"Blink or WebKit":"WebKit"):/Trident/i.test(ua)?"Trident":"Unknown";
 return {name,version,platform,engine,brands:brandNames,rawUserAgent:ua};
}
export function detectFeatures(){
 const n=globalThis.navigator||{};
 return {
  webAssembly:typeof WebAssembly!=="undefined",
  webGPU:!!n.gpu,
  webAudio:!!(globalThis.AudioContext||globalThis.webkitAudioContext),
  webRTC:typeof RTCPeerConnection!=="undefined",
  webGL2:typeof WebGL2RenderingContext!=="undefined",
  workers:typeof Worker!=="undefined",
  serviceWorkers:!!n.serviceWorker,
  indexedDB:!!globalThis.indexedDB,
  fileSystemAccess:typeof showOpenFilePicker==="function",
  webBluetooth:!!n.bluetooth,
  webUSB:!!n.usb,
  webSerial:!!n.serial,
  barcodeDetector:typeof BarcodeDetector!=="undefined",
  touch:(n.maxTouchPoints||0)>0,
  pointerFine:typeof matchMedia==="function"&&matchMedia("(pointer:fine)").matches,
  pointerCoarse:typeof matchMedia==="function"&&matchMedia("(pointer:coarse)").matches
 };
}
export function detectEnvironment(){
 const browser=detectBrowser(),features=detectFeatures();
 const compact=typeof matchMedia==="function"&&matchMedia("(max-width: 767px)").matches;
 const desktop=features.pointerFine&&!compact;
 return {browser,features,layout:desktop?"desktop":compact?"mobile":"tablet-or-touch-desktop",orientation:typeof matchMedia==="function"&&matchMedia("(orientation:portrait)").matches?"portrait":"landscape"};
}
