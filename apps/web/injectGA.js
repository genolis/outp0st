const fs = require('fs');

const html = fs.readFileSync('./build/index.html', {encoding:'utf8'});
const GA = `

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YP41TNS3SH"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());



gtag('config', 'G-YP41TNS3SH');
</script>

`

const htmlGA = html.replace('</body>', `${GA}</body>`);

fs.writeFileSync('./build/index.html', htmlGA);