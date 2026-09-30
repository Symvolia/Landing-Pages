import Script from "next/script";

export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const hotjar = process.env.NEXT_PUBLIC_HOTJAR_ID;
  const gaSafe = ga && /^G-[A-Z0-9]+$/.test(ga) ? ga : null;
  const hotjarSafe = hotjar && /^\d+$/.test(hotjar) ? hotjar : null;

  return (
    <>
      {gaSafe ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaSafe}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaSafe}');`}
          </Script>
        </>
      ) : null}
      {hotjarSafe ? (
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarSafe},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      ) : null}
    </>
  );
}
