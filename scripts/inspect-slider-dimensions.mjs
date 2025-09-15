import fs from 'fs';
import sharp from 'sharp';

async function main(){
  const dir = 'public/sliders';
  if(!fs.existsSync(dir)) { console.error('Directory not found:', dir); process.exit(1); }
  const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g)$/i.test(f));
  const rows = [];
  for(const f of files){
    const p = `${dir}/${f}`;
    try {
      const meta = await sharp(p).metadata();
      const ratio = meta.width && meta.height ? +(meta.width / meta.height).toFixed(4) : null;
      rows.push({ file: f, width: meta.width, height: meta.height, ratio });
    } catch (e) {
      rows.push({ file: f, error: e.message });
    }
  }
  console.log(JSON.stringify(rows, null, 2));
}
main().catch(e=>{ console.error(e); process.exit(1); });
