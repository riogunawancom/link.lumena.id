import Script from "next/script";

import { EXTERNAL_ID_KEY } from "@/lib/marketing";

const PIXEL_RAW = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const PIXEL_ID = /^\d{8,20}$/.test(PIXEL_RAW) ? PIXEL_RAW : "";

/**
 * Base code Meta Pixel. Hanya dirender kalau NEXT_PUBLIC_META_PIXEL_ID
 * diisi, jadi selama belum diisi tidak ada request pihak ketiga sama
 * sekali. Event konversi ada di <MetaPixelLead /> pada halaman
 * terima kasih. `external_id` first-party ikut di `fbq('init')` untuk
 * Advanced Matching.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
(function(){
  var am={};
  try{
    var id=localStorage.getItem('${EXTERNAL_ID_KEY}');
    if(!id&&crypto.randomUUID){id=crypto.randomUUID();localStorage.setItem('${EXTERNAL_ID_KEY}',id);}
    if(id)am.external_id=id;
  }catch(e){}
  fbq('init','${PIXEL_ID}',am);
  fbq('track','PageView');
})();`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

/** Event konversi, dipasang di halaman terima kasih. */
export function MetaPixelLead() {
  if (!PIXEL_ID) return null;

  return (
    <Script id="meta-pixel-lead" strategy="afterInteractive">
      {`if(typeof fbq==='function'){fbq('track','Lead');}`}
    </Script>
  );
}
