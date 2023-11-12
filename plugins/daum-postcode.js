// plugins/daum-postcode.js
export default function({ app }) {
  if (process.client) {
    const daumPostcodeScript = document.createElement('script');
    daumPostcodeScript.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    daumPostcodeScript.async = true;
    document.head.appendChild(daumPostcodeScript);
  }
}
