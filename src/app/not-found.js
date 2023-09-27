export const metadata = {
    title: '404 Page Not Found'
}
 
export default function NotFound() {
  return (
    <div style={{
        textAlign: 'center',
        paddingTop: '5em',
    }}>
      <h2 style={{margin: '1.5em 0'}}>404 Page Not Found</h2>
      <p>This page does not exist, please check the URL and try again.</p>
    </div>
  )
}