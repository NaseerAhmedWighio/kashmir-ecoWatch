## Error Type
Recoverable Error

## Error Message
Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <InnerLayoutRouter url="/biodivers..." tree={[...]} params={{}} cacheNode={{rsc:{...}, ...}} segmentPath={[...]} ...>
      <SegmentViewNode type="page" pagePath="biodiversi...">
        <SegmentTrieNode>
        <ClientPageRoot Component={function BiodiversityDashboardsPage} serverProvidedParams={{...}}>
          <BiodiversityDashboardsPage params={Promise} searchParams={Promise}>
            <main className="min-h-scre...">
              <div>
              <div className="container ...">
                <section>
                <section>
                <section>
                <section>
                <section>
                <section>
                <section>
                <section>
                  <div>
                  <Card className="glass-inte..." padding="lg">
                    <div onClick={undefined} className="backdrop-b...">
                      <div className="flex items...">
                        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} ...>
                          <div className="flex-1 fle..." style={{opacity:0, ...}} ref={function useMotionRef.useCallback}>
                            <div className="text-xs text-slate-400 mb-2 font-mono">
+                             63
-                             64
                            ...
                        ...
                      ...
                ...
      ...



    at div (<anonymous>:null:null)
    at eval (src\app\biodiversity\dashboards\page.tsx:852:21)
    at Array.map (<anonymous>:null:null)
    at BiodiversityDashboardsPage (src\app\biodiversity\dashboards\page.tsx:840:26)

## Code Frame
  850 |                     className="flex-1 flex flex-col items-center justify-end h-full"
  851 |                   >
> 852 |                     <div className="text-xs text-slate-400 mb-2 font-mono">{point.riskScore}</div>
      |                     ^
  853 |                     <motion.div
  854 |                       initial={{ height: 0 }}
  855 |                       whileInView={{ height: `${heightPct}%` }}

Next.js version: 16.2.2 (Webpack)
